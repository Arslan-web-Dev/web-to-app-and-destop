# System Deployment Guide

Instructions to run the platform locally or deploy to target Kubernetes clusters.

## Local Development Setup

1. **Install Root Node Dependencies**
   ```bash
   npm install
   ```

2. **Generate Database Client**
   ```bash
   npm run db:generate
   ```

3. **Start Microservices (NestJS + NextJS + FastAPI)**
   Configure environment variables in `.env` and start Turborepo:
   ```bash
   npm run dev
   ```

## Production Deployment

### 1. Docker Compose (Single node VM)
Run all services, Redis, and database using the centralized Docker Compose file:
```bash
npm run docker:up
```

### 2. Kubernetes Deploy (Cluster scale)
Apply deployment configs:
```bash
npm run k8s:apply
```
This deploys gateway, workers, fastapi engines, and configures ingress routing and TLS options.
