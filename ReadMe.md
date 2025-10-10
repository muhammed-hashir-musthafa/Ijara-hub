# 🏠🚗 Ijara Hub – Monorepo (Client + Server)

## 🌍 Overview

**Ijara Hub** is a modern rental platform designed for the UAE market, connecting **owners**, **renters**, and **admins** in one seamless ecosystem.
Users can **list, discover, and manage** rentals for both **rooms** and **cars**, all within a unified application.
Built as a **monorepo**, the project contains a **Next.js 15** client and a **Node.js/Express/TypeScript** server, enabling fast development, shared types, and consistent deployment.

---

## 🧱 Project Structure

```
IjaraHub/
│
├── Client/     # Next.js 15 (React 19) + Tailwind CSS frontend
│
└── Server/     # Express + TypeScript + Socket.IO + Mongoose backend
```

---

## 🎯 Project Motive

* Simplify the rental process across the UAE.
* Provide verified listings for both **rooms** and **cars**.
* Offer an intuitive dashboard for **owners** to manage listings and **renters** to book with confidence.
* Enable **admins** to oversee users, content, and overall platform operations.
* Deliver a real-time experience using **Socket.IO** for chat and booking updates.

---

## ⚙️ Prerequisites

* **Node.js** v20+
* **pnpm** or **npm**
* **Docker** (optional, for containerized runs)

---

## 🧩 Local Development

### ▶️ Client

```bash
cd Client
npm install
npm run dev
```

The client runs at **[http://localhost:3000](http://localhost:3000)**

### ⚙️ Server

```bash
cd Server
npm install
```

Create a `.env` file with:

```
PORT=5000
MONGODB_URI=<your_mongo_connection_string>
```

Then start the dev server:

```bash
npm run dev
```

The API runs at **[http://localhost:5000](http://localhost:5000)**

---

## 🐳 Docker

Build and run both services with Docker Compose:

```bash
docker compose up --build
```

This starts:

* 🌐 Client → [http://localhost:3000](http://localhost:3000)
* 🧠 Server → [http://localhost:5000](http://localhost:5000)

---

## 🔁 CI/CD

GitHub Actions workflow:

* Builds and lints both client and server
* Runs tests (if configured)
* Builds Docker images for deployment

See **`.github/workflows/ci.yml`** for details.

---

## 🔐 Environment Variables

**Server:**

```
PORT=5000
MONGODB_URI=mongodb+srv://...
```

**Client:**

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=Ijara Hub
```

---

## 🦯 Notes

* Next.js is configured with `output=standalone` for smaller Docker images.
* Update `image.remotePatterns` in **Client/next.config.ts** if you load external images.
* Use consistent types and shared models between client and server for better DX.

---

## 👥 Roles

| Role       | Description                                   |
| ---------- | --------------------------------------------- |
| **Admin**  | Manages users, listings, and platform content |
| **Owner**  | Lists and manages rooms or cars for rent      |
| **Renter** | Searches, books, and manages active rentals   |

---

## 💡 Future Enhancements

* Payment gateway integration (Stripe or UAE-based alternatives)
* Multi-language support (English / Arabic)
* Booking history, reviews, and ratings
* Enhanced verification system for owners

---

**🚀 Ijara Hub** — Simplifying rentals in the UAE, one booking at a time.
