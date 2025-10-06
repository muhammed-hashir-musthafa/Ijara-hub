Ijara Hub – Monorepo (Client + Server)

Overview
Ijara Hub is a monorepo containing a Next.js client (App Router) and a Node.js/Express/TypeScript server. This README covers local development, Docker, and CI.

Structure
- Client: Next.js 15 (React 19), Tailwind CSS
- Server: Express + TypeScript + Socket.IO + Mongoose

Prerequisites
- Node.js 20+
- pnpm or npm
- Docker (optional, for containerized runs)

Local Development
Client
1. cd Client
2. npm install
3. npm run dev
The client runs on http://localhost:3000.

Server
1. cd Server
2. npm install
3. Create .env with PORT=5000 and Mongo URL if using DB
4. npm run dev
API runs on http://localhost:5000.

Docker
Build and run both services with docker-compose:
1. docker compose up --build
This starts:
- client: http://localhost:3000
- server: http://localhost:5000

CI/CD
GitHub Actions workflow builds and lints both apps and performs Docker builds. See .github/workflows/ci.yml.

Environment Variables
- Server: PORT (default 5000), MONGODB_URI
- Client: NEXT_PUBLIC_* variables as needed

Notes
- Next.js configured with output=standalone for smaller Docker images.
- Update image remote patterns in Client/next.config.ts if you load external images.
