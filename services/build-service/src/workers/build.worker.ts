import { Processor, Process, InjectQueue } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Docker from 'dockerode';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface BuildJobData {
  buildId: string;
  projectId: string;
  platform: string;
  format: string;
  version: string;
  features: string[];
  sourceCodeUrl: string;
}

@Injectable()
@Processor('build-queue', {
  concurrency: 2,
})
export class BuildWorker {
  private supabase: SupabaseClient;
  private docker: Docker;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    this.docker = new Docker();
  }

  @Process('build-android')
  async buildAndroid(job: Job<BuildJobData>) {
    const { buildId, projectId, format, version, features } = job.data;

    try {
      await this.updateBuildStatus(buildId, 'RUNNING', 0);

      // Step 1: Download source code (10%)
      await this.updateBuildStatus(buildId, 'RUNNING', 10);
      const sourcePath = await this.downloadSourceCode(job.data.sourceCodeUrl);

      // Step 2: Prepare build environment (20%)
      await this.updateBuildStatus(buildId, 'RUNNING', 20);
      const buildDir = await this.prepareBuildDirectory(sourcePath, 'android');

      // Step 3: Run Gradle build in Docker (20-80%)
      await this.updateBuildStatus(buildId, 'RUNNING', 30);
      const artifactPath = await this.runDockerBuild({
        buildId,
        buildDir,
        image: 'universalwebtonative/android-builder:latest',
        platform: 'android',
        format,
        version,
        features,
        onProgress: (progress) => this.updateBuildStatus(buildId, 'RUNNING', 30 + progress * 0.5),
      });

      // Step 4: Sign artifact (80-90%)
      await this.updateBuildStatus(buildId, 'RUNNING', 80);
      const signedArtifact = await this.signArtifact(artifactPath, 'android', buildId);

      // Step 5: Upload to storage (90-95%)
      await this.updateBuildStatus(buildId, 'RUNNING', 90);
      const artifactUrl = await this.uploadArtifact(signedArtifact, buildId);

      // Step 6: Complete (100%)
      await this.completeBuild(buildId, artifactUrl);

      // Notify user
      await this.notifyBuildComplete(buildId, projectId);

    } catch (error) {
      await this.failBuild(buildId, error);
      throw error;
    }
  }

  @Process('build-ios')
  async buildIOS(job: Job<BuildJobData>) {
    const { buildId, projectId, format, version } = job.data;

    try {
      await this.updateBuildStatus(buildId, 'RUNNING', 0);

      // iOS builds require macOS - use GitHub Actions or cloud Mac runner
      await this.updateBuildStatus(buildId, 'RUNNING', 10);

      // Trigger GitHub Actions workflow
      const workflowRun = await this.triggerGitHubActions({
        workflow: 'build-ios.yml',
        inputs: {
          build_id: buildId,
          project_id: projectId,
          format,
          version,
        },
      });

      // Poll for completion
      await this.pollWorkflowCompletion(workflowRun.id, (progress) => {
        this.updateBuildStatus(buildId, 'RUNNING', progress);
      });

      // Download artifact from GitHub
      const artifactUrl = await this.downloadGitHubArtifact(workflowRun.id, buildId);

      await this.completeBuild(buildId, artifactUrl);
      await this.notifyBuildComplete(buildId, projectId);

    } catch (error) {
      await this.failBuild(buildId, error);
      throw error;
    }
  }

  @Process('build-desktop')
  async buildDesktop(job: Job<BuildJobData>) {
    const { buildId, projectId, platform, format, version, features } = job.data;

    try {
      await this.updateBuildStatus(buildId, 'RUNNING', 0);

      // Step 1: Download source
      await this.updateBuildStatus(buildId, 'RUNNING', 10);
      const sourcePath = await this.downloadSourceCode(job.data.sourceCodeUrl);

      // Step 2: Prepare Tauri build
      await this.updateBuildStatus(buildId, 'RUNNING', 20);
      const buildDir = await this.prepareBuildDirectory(sourcePath, 'desktop');

      // Step 3: Build for target platform
      await this.updateBuildStatus(buildId, 'RUNNING', 30);
      const targets = this.getDesktopTargets(platform);

      for (const target of targets) {
        await this.runDockerBuild({
          buildId,
          buildDir,
          image: 'universalwebtonative/desktop-builder:latest',
          platform: 'desktop',
          format,
          version,
          features,
          target,
          onProgress: (progress) => this.updateBuildStatus(buildId, 'RUNNING', 30 + progress * 0.6),
        });
      }

      // Step 4: Package
      await this.updateBuildStatus(buildId, 'RUNNING', 90);
      const artifactPath = await this.packageDesktopArtifacts(buildDir, platform, format);

      // Step 5: Upload
      await this.updateBuildStatus(buildId, 'RUNNING', 95);
      const artifactUrl = await this.uploadArtifact(artifactPath, buildId);

      await this.completeBuild(buildId, artifactUrl);
      await this.notifyBuildComplete(buildId, projectId);

    } catch (error) {
      await this.failBuild(buildId, error);
      throw error;
    }
  }

  @Process('build-pwa')
  async buildPWA(job: Job<BuildJobData>) {
    const { buildId, projectId } = job.data;

    try {
      await this.updateBuildStatus(buildId, 'RUNNING', 0);

      // PWA build is simpler - just optimize and package
      await this.updateBuildStatus(buildId, 'RUNNING', 30);
      const sourcePath = await this.downloadSourceCode(job.data.sourceCodeUrl);

      await this.updateBuildStatus(buildId, 'RUNNING', 60);
      const optimizedPath = await this.optimizePWA(sourcePath);

      await this.updateBuildStatus(buildId, 'RUNNING', 90);
      const artifactUrl = await this.uploadArtifact(optimizedPath, buildId);

      await this.completeBuild(buildId, artifactUrl);
      await this.notifyBuildComplete(buildId, projectId);

    } catch (error) {
      await this.failBuild(buildId, error);
      throw error;
    }
  }

  // Helper methods
  private async updateBuildStatus(buildId: string, status: string, progress: number) {
    await this.supabase
      .from('build_jobs')
      .update({ status, progress, started_at: status === 'RUNNING' ? new Date().toISOString() : undefined })
      .eq('id', buildId);

    // Log build progress
    await this.supabase.from('build_logs').insert({
      build_id: buildId,
      level: 'INFO',
      message: `Build ${status.toLowerCase()} - ${progress}%`,
      metadata: { progress },
    });
  }

  private async downloadSourceCode(url: string): Promise<string> {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'build-'));
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const zipPath = path.join(tempDir, 'source.zip');
    await fs.writeFile(zipPath, Buffer.from(buffer));

    // Extract
    await execAsync(`unzip -q "${zipPath}" -d "${tempDir}/source"`);
    return path.join(tempDir, 'source');
  }

  private async prepareBuildDirectory(sourcePath: string, platform: string): Promise<string> {
    const buildDir = path.join(os.tmpdir(), `build-${platform}-${Date.now()}`);
    await fs.mkdir(buildDir, { recursive: true });

    // Copy source to build directory
    await execAsync(`cp -r "${sourcePath}"/* "${buildDir}/"`);

    return buildDir;
  }

  private async runDockerBuild({
    buildId,
    buildDir,
    image,
    platform,
    format,
    version,
    features,
    target,
    onProgress,
  }: {
    buildId: string;
    buildDir: string;
    image: string;
    platform: string;
    format: string;
    version: string;
    features: string[];
    target?: string;
    onProgress: (progress: number) => void;
  }): Promise<string> {
    const container = await this.docker.createContainer({
      Image: image,
      Env: [
        `BUILD_ID=${buildId}`,
        `PLATFORM=${platform}`,
        `FORMAT=${format}`,
        `VERSION=${version}`,
        `FEATURES=${features.join(',')}`,
        `TARGET=${target || ''}`,
      ],
      HostConfig: {
        Binds: [`${buildDir}:/app/src`],
        Memory: 8 * 1024 * 1024 * 1024, // 8GB
        CpuQuota: 400000, // 4 cores
        AutoRemove: true,
      },
      WorkingDir: '/app/src',
      Cmd: ['./build.sh'],
    });

    // Stream logs
    const stream = await container.attach({
      stream: true,
      stdout: true,
      stderr: true,
    });

    stream.on('data', (chunk: Buffer) => {
      const log = chunk.toString();
      this.logBuildOutput(buildId, log);

      // Extract progress from log
      const progressMatch = log.match(/PROGRESS:(\d+)/);
      if (progressMatch) {
        onProgress(parseInt(progressMatch[1]));
      }
    });

    await container.start();
    const result = await container.wait();

    if (result.StatusCode !== 0) {
      throw new Error(`Build failed with code ${result.StatusCode}`);
    }

    // Find output artifact
    const outputDir = path.join(buildDir, 'output');
    const files = await fs.readdir(outputDir);
    const artifact = files.find(f => f.endsWith(`.${format.toLowerCase()}`));

    if (!artifact) {
      throw new Error('Build artifact not found');
    }

    return path.join(outputDir, artifact);
  }

  private async signArtifact(artifactPath: string, platform: string, buildId: string): Promise<string> {
    if (platform === 'android') {
      // Sign APK/AAB with keystore
      const keystorePath = process.env.ANDROID_KEYSTORE_PATH;
      const keystorePassword = process.env.ANDROID_KEYSTORE_PASSWORD;
      const keyAlias = process.env.ANDROID_KEY_ALIAS;

      if (!keystorePath || !keystorePassword || !keyAlias) {
        console.warn('Android signing credentials not configured, skipping signing');
        return artifactPath;
      }

      const signedPath = artifactPath.replace(/\.apk$/, '-signed.apk').replace(/\.aab$/, '-signed.aab');

      await execAsync(
        `jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 ` +
        `-keystore "${keystorePath}" -storepass "${keystorePassword}" ` +
        `"${artifactPath}" "${keyAlias}"`
      );

      // Align APK
      if (artifactPath.endsWith('.apk')) {
        await execAsync(`zipalign -v 4 "${artifactPath}" "${signedPath}"`);
      }

      return signedPath;
    }

    return artifactPath;
  }

  private async uploadArtifact(artifactPath: string, buildId: string): Promise<string> {
    const fileName = path.basename(artifactPath);
    const fileBuffer = await fs.readFile(artifactPath);

    const { data, error } = await this.supabase.storage
      .from('build-artifacts')
      .upload(`${buildId}/${fileName}`, fileBuffer, {
        contentType: this.getContentType(fileName),
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = this.supabase.storage
      .from('build-artifacts')
      .getPublicUrl(`${buildId}/${fileName}`);

    return publicUrl;
  }

  private async completeBuild(buildId: string, artifactUrl: string) {
    const stats = await fs.stat(artifactUrl);

    await this.supabase
      .from('build_jobs')
      .update({
        status: 'COMPLETED',
        progress: 100,
        artifact_url: artifactUrl,
        artifact_size: stats.size,
        completed_at: new Date().toISOString(),
      })
      .eq('id', buildId);

    await this.supabase.from('build_logs').insert({
      build_id: buildId,
      level: 'INFO',
      message: 'Build completed successfully',
      metadata: { artifact_url: artifactUrl },
    });
  }

  private async failBuild(buildId: string, error: any) {
    await this.supabase
      .from('build_jobs')
      .update({
        status: 'FAILED',
        failed_at: new Date().toISOString(),
        error_message: error.message,
        error_stack: error.stack,
      })
      .eq('id', buildId);

    await this.supabase.from('build_logs').insert({
      build_id: buildId,
      level: 'ERROR',
      message: error.message,
      metadata: { stack: error.stack },
    });

    // Get project info for notification
    const { data: build } = await this.supabase
      .from('build_jobs')
      .select('project_id')
      .eq('id', buildId)
      .single();

    if (build?.project_id) {
      const { data: project } = await this.supabase
        .from('projects')
        .select('owner_id, name')
        .eq('id', build.project_id)
        .single();

      if (project) {
        await this.supabase.from('notifications').insert({
          user_id: project.owner_id,
          type: 'BUILD_FAILED',
          title: 'Build Failed',
          message: `Build for "${project.name}" failed: ${error.message}`,
          data: { build_id: buildId },
        });
      }
    }
  }

  private async notifyBuildComplete(buildId: string, projectId: string) {
    const { data: project } = await this.supabase
      .from('projects')
      .select('owner_id, name')
      .eq('id', projectId)
      .single();

    if (project) {
      await this.supabase.from('notifications').insert({
        user_id: project.owner_id,
        type: 'BUILD_COMPLETE',
        title: 'Build Complete',
        message: `Your build for "${project.name}" is ready for download!`,
        data: { build_id: buildId },
      });
    }
  }

  private async logBuildOutput(buildId: string, output: string) {
    await this.supabase.from('build_logs').insert({
      build_id: buildId,
      level: 'INFO',
      message: output.substring(0, 1000), // Limit log size
    });
  }

  private getDesktopTargets(platform: string): string[] {
    const targets: Record<string, string[]> = {
      'DESKTOP_WINDOWS': ['x86_64-pc-windows-msvc'],
      'DESKTOP_MACOS': ['x86_64-apple-darwin', 'aarch64-apple-darwin'],
      'DESKTOP_LINUX': ['x86_64-unknown-linux-gnu', 'x86_64-unknown-linux-musl'],
    };
    return targets[platform] || [];
  }

  private getContentType(fileName: string): string {
    const ext = path.extname(fileName).toLowerCase();
    const types: Record<string, string> = {
      '.apk': 'application/vnd.android.package-archive',
      '.aab': 'application/octet-stream',
      '.ipa': 'application/octet-stream',
      '.exe': 'application/octet-stream',
      '.msi': 'application/octet-stream',
      '.dmg': 'application/octet-stream',
      '.appimage': 'application/octet-stream',
      '.snap': 'application/octet-stream',
      '.deb': 'application/vnd.debian.binary-package',
      '.zip': 'application/zip',
    };
    return types[ext] || 'application/octet-stream';
  }

  private async triggerGitHubActions({ workflow, inputs }: { workflow: string; inputs: Record<string, string> }) {
    const response = await fetch(`https://api.github.com/repos/universalwebtonative/build-runners/actions/workflows/${workflow}/dispatches`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: 'main',
        inputs,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to trigger GitHub Actions workflow');
    }

    return { id: Date.now().toString() }; // Return mock ID
  }

  private async pollWorkflowCompletion(runId: string, onProgress: (progress: number) => void) {
    // Poll GitHub Actions API for completion
    // Simplified - in production, implement proper polling
    for (let i = 0; i < 60; i++) {
      await new Promise(resolve => setTimeout(resolve, 30000)); // 30s intervals
      onProgress(Math.min(90, (i / 60) * 100));
    }
  }

  private async downloadGitHubArtifact(runId: string, buildId: string): Promise<string> {
    // Download artifact from GitHub Actions
    // Simplified - implement actual GitHub API call
    return `https://artifacts.universalwebtonative.com/${buildId}/artifact`;
  }

  private async packageDesktopArtifacts(buildDir: string, platform: string, format: string): Promise<string> {
    const outputDir = path.join(buildDir, 'output');
    const packagePath = path.join(os.tmpdir(), `build-${Date.now()}.${format.toLowerCase()}`);

    // Package based on format
    if (format === 'ZIP') {
      await execAsync(`cd "${outputDir}" && zip -r "${packagePath}" .`);
    } else if (format === 'APPIMAGE') {
      // AppImage packaging
      await execAsync(`cd "${outputDir}" && appimagetool "${outputDir}" "${packagePath}"`);
    }

    return packagePath;
  }

  private async optimizePWA(sourcePath: string): Promise<string> {
    // Run PWA optimization
    const outputDir = path.join(sourcePath, 'dist');
    await execAsync(`cd "${sourcePath}" && npm run build`);

    // Generate service worker
    await execAsync(`cd "${sourcePath}" && npx workbox generateSW workbox-config.js`);

    // Package
    const packagePath = path.join(os.tmpdir(), `pwa-${Date.now()}.zip`);
    await execAsync(`cd "${outputDir}" && zip -r "${packagePath}" .`);

    return packagePath;
  }
}
