# Platform Architecture Guide

This document describes the architectural layout and processing workflow of the Universal Web to Native Platform.

## System Overview

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

## Microservices Breakdown

1. **API Gateway (NestJS)**
   - Acts as the unified entry point.
   - Manages accounts, sessions, database transactions via Prisma, rate-limiting, and Stripe billing.

2. **AI Service (FastAPI)**
   - Orchestrates website structural exploration and component parsing.
   - Outputs complete native client code bases using specialized platform generators.

3. **Build Workers (Node.js/BullMQ)**
   - Processes asynchronous native build pipelines.
   - Compiles projects via Docker containers (Android/Tauri/PWA) or cloud runners (iOS via Xcode/GitHub Actions).
