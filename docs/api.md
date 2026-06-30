# API Reference Documentation

The API Gateway is documented in detail via Swagger OpenAPI. When running the gateway locally, visit `/api/docs` to view interactive testing pages.

## Key REST Endpoints

### 1. Authentication
- `POST /v1/auth/register` - Create user account
- `POST /v1/auth/login` - Authenticate credentials and return JWTs
- `POST /v1/auth/refresh` - Swap refresh token for fresh access token

### 2. Projects & Analysis
- `POST /v1/projects` - Create a new app project definition
- `GET /v1/projects` - List all user projects
- `POST /v1/analysis/:projectId/trigger` - Request AI signature search & UI mapping

### 3. Native Builds
- `POST /v1/builds` - Initiate a compiler queue run for Target OS
- `GET /v1/builds/:id` - Fetch build progress, success logs, or artifact download URLs

### 4. Billing
- `POST /v1/billing/checkout` - Create Stripe subscription checkout
- `POST /v1/billing/credits/checkout` - Top up AI credits
- `POST /v1/billing/webhook` - Stripe async payment event callbacks
