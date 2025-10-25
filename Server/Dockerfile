# --- Stage 1: install dependencies (including dev) ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./
RUN npm ci

# --- Stage 2: build the app ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- Stage 3: run the app in production ---
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.env* ./
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY package.json ./
# Remove dev dependencies for a smaller image
RUN npm prune --omit=dev
EXPOSE 5000
CMD ["node", "dist/index.js"]
