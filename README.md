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


