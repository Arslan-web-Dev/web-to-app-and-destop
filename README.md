# Universal Web to Native Platform

## Overview
The **Universal Web to Native** platform is a production-grade full‑stack monorepo that transforms any web application into native mobile (iOS, Android), desktop (Windows, macOS, Linux), and progressive web app (PWA) clients. It provides a SaaS‑style workflow where users submit a website URL, the system analyzes the site structure using AI, generates platform‑specific wrapper code bases, builds native binaries asynchronously, and stores the resulting executable artifacts.

## Core Functionalities
- **Web‑site analysis** – FastAPI AI service crawls the target URL, detects UI components, routes, and assets.
- **Multi‑platform code generation** – Generators produce iOS (Swift), Android (Kotlin), desktop (Tauri/Electron), and PWA code bases.
- **Asynchronous build pipelines** – BullMQ + Redis workers enqueue build jobs, spin up Docker containers or GitHub Actions runners, and publish binaries to S3/Supabase storage.
- **User management & billing** – Supabase authentication, Stripe subscription handling, role‑based access control.
- **API gateway** – NestJS service exposing a unified REST/GraphQL API, handling authentication, rate‑limiting, and database interactions via Prisma.
- **Deployment & CI/CD** – Docker Compose for local development, Vercel for the Next.js front‑end, and GitHub Actions for production builds.

## Technologies Stack
| Layer | Technology |
|---|---|
| Front‑end | Next.js (React), Tailwind CSS, TypeScript, TanStack Query |
| API Gateway | NestJS, TypeScript, Prisma, PostgreSQL (Supabase) |
| AI Service | FastAPI (Python), OpenAI / Gemini / Claude APIs |
| Build Workers | Node.js, BullMQ, Redis |
| Containerisation | Docker, Docker Compose |
| Cloud Storage | AWS S3 / Supabase Storage |
| Billing | Stripe |
| CI/CD | GitHub Actions, Vercel |
| Database | PostgreSQL (hosted on Supabase) |
| Auth | Supabase Auth, JWT |

## Frontend Portal Pages & Routes

The Next.js web application is located under `apps/web` and includes the following fully routed and functional dashboard pages:

### Authentication Pages
* **Login (`/login`)** — [login/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/(auth)/login/page.tsx)
  * Supports email/password credentials authentication and OAuth authentication via Google.
  * Dynamically queries user state and session cookies.

### Dashboard Pages (Protected Routes)
All pages are located under the dashboard routing context:
* **Main Dashboard (`/dashboard`)** — [dashboard/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/dashboard/page.tsx)
  * Visualizes platform stats (total projects, builds, completed/pending compilations).
  * Lists recent active projects, active build jobs, quick actions, and recent user notification activity logs.
* **Projects Manager (`/dashboard/projects`)** — [dashboard/projects/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/dashboard/projects/page.tsx)
  * View, filter, and search active projects.
  * Open the **Create Project Dialog** to scan a new website URL, upload a project zip, or connect a GitHub repository.
* **Project Details (`/dashboard/projects/[projectId]`)** — [dashboard/projects/[projectId]/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/dashboard/projects/%5BprojectId%5D/page.tsx)
  * Detailed breakdown of a specific project's parameters.
  * Real-time build history tracking for iOS, Android, and Desktop platforms.
  * Direct artifact download buttons for compiled executables.
* **AI Analysis Report (`/dashboard/projects/[projectId]/analysis`)** — [dashboard/projects/[projectId]/analysis/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/dashboard/projects/%5BprojectId%5D/analysis/page.tsx)
  * Comprehensive AI audit logs showing framework indicators, layout responsiveness, deep linking setup, and custom PWA manifests.
  * Highlights automated AI-generated security scanning and architecture recommendations.
* **Builds History (`/dashboard/builds`)** — [dashboard/builds/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/dashboard/builds/page.tsx)
  * Global history of all native package compilation outputs, tracking platform targets, compilation durations, progress ratios, and current build status.
* **Team Management (`/dashboard/team`)** — [dashboard/team/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/dashboard/team/page.tsx)
  * View collaborative members in the organization, assign roles (Owner, Admin, Developer), check invitation statuses, and invite new members.
* **Billing & Quotas (`/dashboard/billing`)** — [dashboard/billing/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/dashboard/billing/page.tsx)
  * Displays details on active subscription tiers (Professional/Business/Enterprise).
  * Monitored quota usages for build credits, AI scanners, and project counts.
  * Manage active credit cards and upgrade subscription plans.
* **Account Settings (`/dashboard/settings`)** — [dashboard/settings/page.tsx](file:///d:/github%20project/web-to-app-and-destop/apps/web/src/app/dashboard/settings/page.tsx)
  * Update general user profile details, change login passwords, toggles, and generate API developer tokens for pipeline scripts.

## Architecture Diagram
```mermaid
graph TD
    User([SaaS User]) -->|Interacts| NextJS[Next.js Frontend / Admin Portal]
    NextJS -->|HTTP Requests| APIGateway[NestJS API Gateway]
    APIGateway -->|Stores Metadata| PG[(Supabase PostgreSQL)]
    APIGateway -->|Triggers Scans| AIService[FastAPI AI Service]
    APIGateway -->|Enqueues Build Job| Redis[(BullMQ Redis)]
    
    subgraph AI Engine
        AIService --> Crawler[Web Crawler & Signature Detectors]
        AIService --> Generators[Platform Generators: iOS, Android, Tauri, PWA]
    end
    
    subgraph Build Infrastructure
        Redis --> Worker[Build Service Worker]
        Worker -->|Spawns| Docker[Docker Containers / GitHub Actions]
        Docker -->|Outputs Artifact| S3[(AWS S3 / Supabase Storage)]
    end
```

## Getting Started
```bash
# Clone the repository
git clone https://github.com/Arslan-web-Dev/web-to-app-and-destop.git
cd web-to-app-and-destop

# Install root dependencies
npm install

# Start required services (PostgreSQL, Redis) – see docker-compose.yml or use Docker Desktop
docker compose up -d postgres redis

# Generate Prisma client and push schema
npm run db:generate
npm run db:push

# Run the monorepo in development mode
npm run dev
```

## Contributing
We welcome contributions! Please fork the repo, create a feature branch, and submit a pull request. Follow the linting and testing scripts defined in `package.json`.

---
*Enhanced & Maintained by Antigravity AI Assistant*
