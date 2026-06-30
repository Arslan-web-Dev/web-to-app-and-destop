-- ============================================
-- SUPABASE SCHEMA FOR UNIVERSAL WEB TO NATIVE
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');
CREATE TYPE user_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION');
CREATE TYPE org_role AS ENUM ('OWNER', 'ADMIN', 'MEMBER');
CREATE TYPE plan_type AS ENUM ('FREE', 'STARTER', 'PROFESSIONAL', 'BUSINESS', 'ENTERPRISE');
CREATE TYPE source_type AS ENUM ('WEBSITE_URL', 'GITHUB_REPO', 'SOURCE_CODE', 'ZIP_UPLOAD');
CREATE TYPE project_status AS ENUM ('IMPORTING', 'ANALYZING', 'ANALYZED', 'GENERATING', 'READY', 'BUILDING', 'COMPLETED', 'FAILED');
CREATE TYPE platform_type AS ENUM ('DESKTOP_WINDOWS', 'DESKTOP_MACOS', 'DESKTOP_LINUX', 'ANDROID', 'IOS', 'PWA');
CREATE TYPE build_status AS ENUM ('QUEUED', 'PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED', 'RETRYING');
CREATE TYPE build_format AS ENUM ('EXE', 'MSI', 'APP', 'DMG', 'APPIMAGE', 'SNAP', 'DEB', 'APK', 'AAB', 'IPA', 'DOCKER', 'SOURCE');
CREATE TYPE subscription_status AS ENUM ('ACTIVE', 'CANCELLED', 'PAST_DUE', 'UNPAID', 'TRIALING');
CREATE TYPE notification_type AS ENUM ('BUILD_COMPLETE', 'BUILD_FAILED', 'ANALYSIS_COMPLETE', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'SUBSCRIPTION_EXPIRING', 'SECURITY_ALERT', 'SYSTEM');
CREATE TYPE audit_action AS ENUM ('CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT', 'BUILD', 'DEPLOY');

-- ============================================
-- CORE TABLES
-- ============================================

-- Users table (extends auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    avatar TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMPTZ,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret TEXT,
    mfa_backup_codes TEXT[],
    role user_role DEFAULT 'USER',
    status user_status DEFAULT 'PENDING_VERIFICATION',
    plan plan_type DEFAULT 'FREE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Organizations
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    logo TEXT,
    website TEXT,
    plan plan_type DEFAULT 'FREE',
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization Members
CREATE TABLE public.organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role org_role DEFAULT 'MEMBER',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- Teams
CREATE TABLE public.teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'MEMBER',
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(team_id, user_id)
);

-- Projects
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT NOT NULL,
    source_type source_type NOT NULL,
    website_url TEXT,
    github_url TEXT,
    zip_file_url TEXT,
    source_code_path TEXT,
    owner_id UUID REFERENCES public.users(id),
    organization_id UUID REFERENCES public.organizations(id),
    team_id UUID REFERENCES public.teams(id),
    settings JSONB DEFAULT '{}',
    status project_status DEFAULT 'IMPORTING',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    UNIQUE(owner_id, slug)
);

-- AI Analysis
CREATE TABLE public.analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    detected_framework TEXT,
    framework_version TEXT,
    framework_confidence FLOAT,
    pages JSONB DEFAULT '[]',
    routes JSONB DEFAULT '[]',
    navigation JSONB DEFAULT '{}',
    has_auth BOOLEAN DEFAULT FALSE,
    auth_type TEXT,
    has_database BOOLEAN DEFAULT FALSE,
    database_type TEXT,
    has_api BOOLEAN DEFAULT FALSE,
    api_type TEXT,
    has_payment BOOLEAN DEFAULT FALSE,
    payment_provider TEXT,
    has_analytics BOOLEAN DEFAULT FALSE,
    analytics_provider TEXT,
    has_cms BOOLEAN DEFAULT FALSE,
    cms_type TEXT,
    has_admin_panel BOOLEAN DEFAULT FALSE,
    components JSONB DEFAULT '[]',
    theme JSONB DEFAULT '{}',
    has_dark_mode BOOLEAN DEFAULT FALSE,
    is_responsive BOOLEAN DEFAULT FALSE,
    performance_score FLOAT,
    accessibility_score FLOAT,
    seo_score FLOAT,
    security_score FLOAT,
    broken_links JSONB DEFAULT '[]',
    missing_images JSONB DEFAULT '[]',
    large_assets JSONB DEFAULT '[]',
    unused_code JSONB DEFAULT '[]',
    security_risks JSONB DEFAULT '[]',
    raw_analysis JSONB DEFAULT '{}',
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recommendations
CREATE TABLE public.recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    severity TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    suggestion TEXT NOT NULL,
    code_example TEXT,
    is_applied BOOLEAN DEFAULT FALSE,
    applied_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Generated Apps
CREATE TABLE public.generated_apps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    platform platform_type NOT NULL,
    framework TEXT,
    features JSONB DEFAULT '[]',
    source_code_url TEXT,
    status TEXT DEFAULT 'GENERATING',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Build Jobs
CREATE TABLE public.build_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    generated_app_id UUID REFERENCES public.generated_apps(id),
    platform platform_type NOT NULL,
    format build_format NOT NULL,
    version TEXT NOT NULL,
    build_number INTEGER NOT NULL,
    features JSONB DEFAULT '[]',
    status build_status DEFAULT 'QUEUED',
    progress FLOAT DEFAULT 0,
    artifact_url TEXT,
    artifact_size INTEGER,
    checksum TEXT,
    queued_at TIMESTAMPTZ DEFAULT NOW(),
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    failed_at TIMESTAMPTZ,
    error_message TEXT,
    error_stack TEXT,
    build_cost FLOAT
);

-- Build Logs
CREATE TABLE public.build_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    build_id UUID REFERENCES public.build_jobs(id) ON DELETE CASCADE,
    level TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    organization_id UUID REFERENCES public.organizations(id),
    plan plan_type NOT NULL,
    status subscription_status DEFAULT 'ACTIVE',
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    current_period_start TIMESTAMPTZ NOT NULL,
    current_period_end TIMESTAMPTZ NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    usage_limits JSONB DEFAULT '{}',
    current_usage JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Credits
CREATE TABLE public.ai_credits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    amount FLOAT NOT NULL,
    balance FLOAT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    build_id UUID,
    project_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- API Keys
CREATE TABLE public.api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    key_hash TEXT NOT NULL,
    key_prefix TEXT NOT NULL,
    scopes TEXT[] DEFAULT '{}',
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    is_revoked BOOLEAN DEFAULT FALSE,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Logs
CREATE TABLE public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}',
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id),
    action audit_action NOT NULL,
    resource TEXT NOT NULL,
    resource_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Devices
CREATE TABLE public.devices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT,
    type TEXT,
    os TEXT,
    os_version TEXT,
    browser TEXT,
    browser_version TEXT,
    fingerprint TEXT,
    last_active_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_status ON public.users(status);
CREATE INDEX idx_users_plan ON public.users(plan);
CREATE INDEX idx_users_auth_id ON public.users(auth_id);

CREATE INDEX idx_organizations_slug ON public.organizations(slug);

CREATE INDEX idx_org_members_org ON public.organization_members(organization_id);
CREATE INDEX idx_org_members_user ON public.organization_members(user_id);

CREATE INDEX idx_projects_owner ON public.projects(owner_id);
CREATE INDEX idx_projects_org ON public.projects(organization_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_deleted ON public.projects(deleted_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_analyses_project ON public.analyses(project_id);

CREATE INDEX idx_recommendations_project ON public.recommendations(project_id);

CREATE INDEX idx_generated_apps_project ON public.generated_apps(project_id);
CREATE INDEX idx_generated_apps_platform ON public.generated_apps(platform);

CREATE INDEX idx_build_jobs_project ON public.build_jobs(project_id);
CREATE INDEX idx_build_jobs_status ON public.build_jobs(status);
CREATE INDEX idx_build_jobs_queued ON public.build_jobs(queued_at);

CREATE INDEX idx_build_logs_build ON public.build_logs(build_id);

CREATE INDEX idx_subscriptions_user ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_org ON public.subscriptions(organization_id);

CREATE INDEX idx_ai_credits_user ON public.ai_credits(user_id);

CREATE INDEX idx_notifications_user ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);

CREATE INDEX idx_api_keys_user ON public.api_keys(user_id);

CREATE INDEX idx_activity_logs_user ON public.activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON public.activity_logs(action);

CREATE INDEX idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);

CREATE INDEX idx_devices_user ON public.devices(user_id);

-- Full-text search indexes
CREATE INDEX idx_projects_name_trgm ON public.projects USING gin(name gin_trgm_ops);
CREATE INDEX idx_organizations_name_trgm ON public.organizations USING gin(name gin_trgm_ops);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.build_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = auth_id OR auth.jwt()->>'role' = 'SUPER_ADMIN');

CREATE POLICY "Users can update own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = auth_id);

-- Organizations policies
CREATE POLICY "Users can view organizations they belong to"
    ON public.organizations FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE organization_id = id AND user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        )
        OR auth.jwt()->>'role' = 'SUPER_ADMIN'
    );

CREATE POLICY "Organization owners and admins can update"
    ON public.organizations FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE organization_id = id 
            AND user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
            AND role IN ('OWNER', 'ADMIN')
        )
    );

-- Organization Members policies
CREATE POLICY "Users can view members of their organizations"
    ON public.organization_members FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.organization_members om
            WHERE om.organization_id = organization_id 
            AND om.user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        )
        OR auth.jwt()->>'role' = 'SUPER_ADMIN'
    );

-- Projects policies
CREATE POLICY "Users can view own projects"
    ON public.projects FOR SELECT
    USING (
        owner_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE organization_id = projects.organization_id
            AND user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        )
        OR auth.jwt()->>'role' = 'SUPER_ADMIN'
    );

CREATE POLICY "Users can create projects"
    ON public.projects FOR INSERT
    WITH CHECK (
        owner_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
    );

CREATE POLICY "Users can update own projects"
    ON public.projects FOR UPDATE
    USING (
        owner_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE organization_id = projects.organization_id
            AND user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
            AND role IN ('OWNER', 'ADMIN')
        )
    );

CREATE POLICY "Users can delete own projects"
    ON public.projects FOR DELETE
    USING (
        owner_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE organization_id = projects.organization_id
            AND user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
            AND role IN ('OWNER', 'ADMIN')
        )
    );

-- Analyses policies
CREATE POLICY "Users can view analyses of their projects"
    ON public.analyses FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.projects
            WHERE id = analyses.project_id
            AND (owner_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
                OR EXISTS (
                    SELECT 1 FROM public.organization_members
                    WHERE organization_id = projects.organization_id
                    AND user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
                ))
        )
    );

-- Build Jobs policies
CREATE POLICY "Users can view build jobs of their projects"
    ON public.build_jobs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.projects
            WHERE id = build_jobs.project_id
            AND (owner_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
                OR EXISTS (
                    SELECT 1 FROM public.organization_members
                    WHERE organization_id = projects.organization_id
                    AND user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
                ))
        )
    );

-- Notifications policies
CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT
    USING (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

CREATE POLICY "Users can update own notifications"
    ON public.notifications FOR UPDATE
    USING (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

-- API Keys policies
CREATE POLICY "Users can manage own API keys"
    ON public.api_keys FOR ALL
    USING (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions"
    ON public.subscriptions FOR SELECT
    USING (
        user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM public.organization_members
            WHERE organization_id = subscriptions.organization_id
            AND user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid())
            AND role IN ('OWNER', 'ADMIN')
        )
    );

-- AI Credits policies
CREATE POLICY "Users can view own credits"
    ON public.ai_credits FOR SELECT
    USING (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

-- Activity Logs policies
CREATE POLICY "Users can view own activity"
    ON public.activity_logs FOR SELECT
    USING (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

-- Devices policies
CREATE POLICY "Users can manage own devices"
    ON public.devices FOR ALL
    USING (user_id = (SELECT id FROM public.users WHERE auth_id = auth.uid()));

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger
CREATE TRIGGER users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER organizations_updated_at BEFORE UPDATE ON public.organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER teams_updated_at BEFORE UPDATE ON public.teams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER generated_apps_updated_at BEFORE UPDATE ON public.generated_apps
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Audit log trigger
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO public.audit_logs (user_id, action, resource, resource_id, old_value, new_value)
        VALUES (
            (SELECT id FROM public.users WHERE auth_id = auth.uid()),
            'UPDATE',
            TG_TABLE_NAME,
            NEW.id,
            row_to_json(OLD),
            row_to_json(NEW)
        );
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO public.audit_logs (user_id, action, resource, resource_id, old_value)
        VALUES (
            (SELECT id FROM public.users WHERE auth_id = auth.uid()),
            'DELETE',
            TG_TABLE_NAME,
            OLD.id,
            row_to_json(OLD)
        );
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO public.audit_logs (user_id, action, resource, resource_id, new_value)
        VALUES (
            (SELECT id FROM public.users WHERE auth_id = auth.uid()),
            'CREATE',
            TG_TABLE_NAME,
            NEW.id,
            row_to_json(NEW)
        );
    END IF;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Apply audit trigger
CREATE TRIGGER projects_audit AFTER INSERT OR UPDATE OR DELETE ON public.projects
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();
CREATE TRIGGER users_audit AFTER INSERT OR UPDATE OR DELETE ON public.users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger();

-- Create default subscription after user creation
CREATE OR REPLACE FUNCTION create_default_subscription()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.subscriptions (user_id, plan, status, current_period_start, current_period_end, usage_limits)
    VALUES (
        NEW.id,
        'FREE',
        'ACTIVE',
        NOW(),
        NOW() + INTERVAL '1 year',
        '{"maxProjects": 3, "maxBuildsPerMonth": 10, "maxTeamMembers": 1, "maxStorageGB": 1}'::jsonb
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_default_subscription AFTER INSERT ON public.users
    FOR EACH ROW EXECUTE FUNCTION create_default_subscription();

-- ============================================
-- REALTIME CONFIGURATION
-- ============================================

BEGIN;
    DROP PUBLICATION IF EXISTS supabase_realtime;
    CREATE PUBLICATION supabase_realtime;
COMMIT;

ALTER PUBLICATION supabase_realtime ADD TABLE public.build_jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.analyses;

-- ============================================
-- EDGE FUNCTIONS (RPC)
-- ============================================

CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'total_projects', COUNT(DISTINCT p.id),
        'total_builds', COUNT(DISTINCT b.id),
        'total_analyses', COUNT(DISTINCT a.id),
        'active_projects', COUNT(DISTINCT p.id) FILTER (WHERE p.status IN ('READY', 'BUILDING', 'COMPLETED')),
        'failed_builds', COUNT(DISTINCT b.id) FILTER (WHERE b.status = 'FAILED'),
        'credits_balance', COALESCE((SELECT balance FROM public.ai_credits WHERE user_id = user_uuid ORDER BY created_at DESC LIMIT 1), 0)
    )
    INTO result
    FROM public.users u
    LEFT JOIN public.projects p ON p.owner_id = u.id AND p.deleted_at IS NULL
    LEFT JOIN public.build_jobs b ON b.project_id = p.id
    LEFT JOIN public.analyses a ON a.project_id = p.id
    WHERE u.id = user_uuid;

    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION check_user_permission(user_uuid UUID, permission TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_plan plan_type;
    plan_permissions JSONB;
BEGIN
    SELECT plan INTO user_plan FROM public.users WHERE id = user_uuid;

    plan_permissions := '{
        "FREE": ["project:create", "project:read", "build:limited"],
        "STARTER": ["project:create", "project:read", "project:update", "build:create"],
        "PROFESSIONAL": ["project:*", "build:*", "team:read", "analytics:read"],
        "BUSINESS": ["project:*", "build:*", "team:*", "analytics:*", "api:access"],
        "ENTERPRISE": ["*"]
    }'::jsonb;

    RETURN permission = ANY(ARRAY(SELECT jsonb_array_elements_text(plan_permissions->user_plan::text)))
        OR '*' = ANY(ARRAY(SELECT jsonb_array_elements_text(plan_permissions->user_plan::text)));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION deduct_ai_credits(
    user_uuid UUID,
    amount FLOAT,
    description TEXT DEFAULT NULL,
    build_uuid UUID DEFAULT NULL,
    project_uuid UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    current_balance FLOAT;
BEGIN
    SELECT COALESCE(balance, 0) INTO current_balance
    FROM public.ai_credits
    WHERE user_id = user_uuid
    ORDER BY created_at DESC
    LIMIT 1;

    IF current_balance < amount THEN
        RETURN FALSE;
    END IF;

    INSERT INTO public.ai_credits (user_id, amount, balance, type, description, build_id, project_id)
    VALUES (user_uuid, -amount, current_balance - amount, 'USAGE', description, build_uuid, project_uuid);

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
