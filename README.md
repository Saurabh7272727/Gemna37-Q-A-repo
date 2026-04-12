# 📌 Gemnaworld

> show demo link under the development
> https://gemnaworld.vercel.app/

> All Your Campus Tools. One Unified Platform.
> Streamline student profiles, attendance tracking, live classes, and team collaboration from a single dashboard.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## 📖 Table of Contents

- [About](#about)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

### Customize how your team’s work flows
Set up, clean up, and automate even the most complicated project workflows.

### Stay on track – even when the track changes
Use the timeline view to map out the big picture, communicate updates to stakeholders, and ensure your team stays on the same page

### Gemna.ai , Know your feeling about us
We are supporting your goal and provide a enivorment to work with real world problem

### Our Goal
Imagine a platform where every aspect of college management—student profiles, attendance, performance tracking, live classes, team collaboration, and task scheduling—is seamlessly integrated into one intuitive system. That’s what Gemna is all abou

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/project-name.git .

2. fork the repo on local machine with the help of clone then you see two folder
   1. Frontend
   2. Backend

3. In side the Frontend folder you run in terminal
   ```bash
   npm install

   ```bash
   npm run dev

4. then open folder Backend runs commands in terminal("dev": "nodemon ./server.js")
   ```bash 
   npm i 
   ```bash 
   npm run dev
   ## insure that to install already nodemon if not install nodemon you can try
   ```bash 
   npm i --dev-save nodemon
# Gemna World

Lightweight developer-focused README for the Gemna World monorepo (Frontend + Backend).

Live demo: https://gemnaworld.vercel.app/ (development)

## Project overview

Gemna World is a college/campus management platform that integrates student profiles, attendance, file uploads, basic analytics, and communication tools. The repository is split into two main folders: `Frontend/` and `Backend/`.

## Repo layout

- `Frontend/` — React (Vite) app, UI components, socket client, and build scripts.
- `Backend/` — Node.js/Express server, controllers, models, services (Redis, BullMQ), and socket handlers.
- `README.md` — this file

## Prerequisites

- Node.js 18+ and npm/yarn
- Docker & Docker Compose (optional, for local services)

## Quick start — Backend

1. Open a terminal and install dependencies:

```bash
cd Backend
npm install
```

2. Create a `.env` file (see `.env.example` below) and set required variables (Cloudinary, OCR, PORT, Redis URL, etc.).

3. Start the server in development:

```bash
npm run dev
```

Production start:

```bash
npm start
```

## Quick start — Frontend

1. Install dependencies and run the dev server:

```bash
cd Frontend
npm install
npm run dev
```

2. Configure `VITE_APP_BACKEND_URL` and `VITE_APP_JSON_SECRET_KEY` in a `.env` file inside `Frontend/`.

## .env examples

Backend `.env` (example entries):

- `PORT=4000`
- `CLOUD_NAME=`
- `CLOUD_API_KEY=`
- `CLOUD_SECRET_KEY=`
- `OCR_KEY=`
- `REDIS_URL=`

Frontend `.env` (Vite):

- `VITE_APP_BACKEND_URL=http://localhost:4000`
- `VITE_APP_JSON_SECRET_KEY=your_random_key`

## Docker (optional)

There is a `Backend/docker-compose.yml` for local services (Redis, etc.). To start services:

```bash
cd Backend
docker compose up -d
```

## Notes on code quality and maintenance

- The project is organized modularly (controllers, services, models). Consider adding:
  - Automated tests and CI (GitHub Actions)
  - Linting (ESLint) and formatting (Prettier)
  - Explicit API documentation (OpenAPI/Swagger)
  - Secret management (do not commit `.env`)

## Contributing

1. Fork the repo and create a feature branch.
2. Run linters/tests locally and open a pull request with a clear description.

## Where to look in the codebase

- API routes: `Backend/Route/`
- Controllers: `Backend/Controller/`
- Models: `Backend/model/`
- Frontend entry: `Frontend/src/main.jsx`

---

If you want, I can also:
- add an `.env.example` file for both `Frontend/` and `Backend/`
- scaffold a basic GitHub Actions CI that runs lint and tests

Updated README to be short, actionable, and developer-focused.




## Big - Changes on repo

# Logging and Monitoring Changes

## What was added

- Central environment loader and config helper in `config/env.js`
- Structured Winston logger with:
  - console logs
  - daily rotated application logs
  - daily rotated error logs
  - request id support
  - trace and span correlation support
  - sensitive field redaction
- OpenTelemetry bootstrap in `observability/telemetry.js`
- HTTP request logging middleware in `observability/httpLogger.js`
- Async request context storage in `observability/requestContext.js`
- Global `404` and error handler middleware in `middleware/errorHandler.js`
- Health endpoints in `Route/system.routes.js`

## Where it was integrated

- `server.js`
  - starts OpenTelemetry before loading the Express app
  - logs startup and shutdown
  - logs uncaught exceptions and unhandled promise rejections
- `app.js`
  - adds request context middleware
  - adds structured request logging
  - registers `/system/health` and `/system/ready`
  - adds centralized not-found and error handlers
- `service/db.js`
  - uses validated env values
  - logs MongoDB connection start and success
- `socket/socket.io.js`
  - logs socket lifecycle and failures
  - blocks mismatched `senderId` values from the client
- `Route/student.fetchdata.router.js`
  - prevents users from updating another user's FCM token
- `Route/student.auth.google.js`
  - removes the hardcoded login bypass pattern
  - signs JWTs with `provider: "google"`
  - adds OAuth `state` validation using a secure cookie

## New endpoints

- `GET /system/health`
  - basic liveness information
- `GET /system/ready`
  - readiness status with MongoDB connection state

## New environment keys

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=
LOG_LEVEL=debug
LOG_DIRECTORY=logs
LOG_MAX_FILES=14d
LOG_MAX_SIZE=20m
LOG_CONSOLE_JSON=false

OTEL_ENABLED=false
OTEL_SERVICE_NAME=gemna-backend
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
OTEL_EXPORTER_OTLP_HEADERS=
OTEL_EXPORTER_OTLP_TRACES_PATH=/v1/traces
OTEL_EXPORTER_OTLP_METRICS_PATH=/v1/metrics
OTEL_TRACES_ENABLED=true
OTEL_METRICS_ENABLED=true
OTEL_METRIC_EXPORT_INTERVAL=15000

REDIS_PASS=
```

## SigNoz setup notes

- Run SigNoz locally or in your server environment.
- Point `OTEL_EXPORTER_OTLP_ENDPOINT` to the OTLP HTTP collector endpoint.
- A common local collector URL is `http://localhost:4318`.
- After enabling `OTEL_ENABLED=true`, traces and metrics should start exporting automatically.

## Security improvements included with this change

- Authorization, cookies, tokens, secrets, and private keys are redacted from logs.
- Google OAuth now validates `state` before accepting the callback.
- The previous hardcoded Google-login bypass string is no longer used in JWTs.
- Notification token update routes now require the authenticated user to update only their own record.

## Important follow-up

- Rotate every secret currently present in `backend/.env`.
- The current `.env` contains real-looking credentials for Cloudinary, Gmail, Google OAuth, Inngest, Vercel KV, Firebase, and JWT secrets.
- Logging is safer now, but secret rotation is still required because those values already exist in plaintext.


<!-- security updates -->


# Backend Security Hardening Report

## Goal

Harden the backend security posture without changing the public route structure or breaking existing client flows.

## What was fixed

### Authentication hardening

- New login JWTs no longer store the user's plaintext password.
- New login JWTs now carry `credentialHash` instead.
- `UserAccessMiddleware` remains backward compatible:
  - existing tokens with `password` still work
  - new tokens with `credentialHash` also work
- Socket authentication now uses centralized env config instead of direct raw `process.env` access.

### OAuth hardening

- Google OAuth already had `state` validation and that was preserved.
- Google-login JWTs continue to work via the `provider: "google"` path.

### Startup safety

- The server now connects to MongoDB before opening the HTTP listener.
- This avoids serving traffic while the database is unavailable.

### Cookie safety

- OTP-related cookies now use:
  - `httpOnly`
  - `sameSite: 'lax'`
  - `secure` in production

### Upload and file cleanup safety

- Profile-image middleware now safely cleans temporary files.
- Cleanup no longer uses an invalid callback pattern with `fs.promises.unlink`.
- Error paths no longer reference undefined response objects.

### Logging and secret hygiene

- Replaced several direct `console.log` / `console.error` calls with structured logger usage.
- Sensitive log fields are still redacted by the Winston logger layer.

### Redis compatibility and noise reduction

- Redis config now supports both:
  - `REDIS_HOST=127.0.0.1`
  - `REDIS_HOST=redis://127.0.0.1`
- Redis clients now emit structured warning logs instead of noisy unhandled events.

### Dependency hardening

- Updated `axios` to `^1.15.0`
- Updated `nodemailer` to `^8.0.5`
- Added safe dependency overrides for:
  - `path-to-regexp`
  - `socket.io-parser`
  - `fast-xml-parser`
  - `node-forge`
  - `picomatch`
  - `brace-expansion`
  - `lodash`

## Vulnerability result

### Before

- `17` total vulnerabilities
- `1 critical`
- `6 high`
- `2 moderate`
- `8 low`

### After

- `8` total vulnerabilities
- `0 critical`
- `0 high`
- `0 moderate`
- `8 low`

## Remaining vulnerabilities

All remaining audit findings are low severity and come from the `firebase-admin` dependency subtree:

- `@google-cloud/firestore`
- `@google-cloud/storage`
- `google-gax`
- `retry-request`
- `teeny-request`
- `http-proxy-agent`
- `@tootallnate/once`

`npm audit` suggests a downgrade path to `firebase-admin@10.3.0`, which would be more disruptive and not an actual safe forward fix for this codebase. Because of that, those low-severity findings were left in place.

## Compatibility notes

- Existing JWTs issued before this hardening still validate.
- New JWTs are safer and do not expose plaintext passwords.
- No route paths were changed.
- No response payload shape was intentionally changed for existing routes.
- Google OAuth flow and login flow remain operational under the same URLs.

## Verification performed

- `node --check app.js`
- `node --check server.js`
- `npm audit --json`
- Runtime startup check:
  - MongoDB connected successfully
  - HTTP server started successfully

## Still recommended

- Rotate every secret currently present in `Backend/.env`
- Add automated tests for:
  - login
  - Google OAuth callback
  - socket auth
  - upload/profile image
  - notification token routes
- Replace plaintext secrets in local `.env` with newly rotated values

