// server.ts
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors, { CorsOptions } from "cors";
import { Server as SocketIOServer } from "socket.io";
import connectDB from "./config/db";
import config from "./config/config";
import { authenticateToken } from "./middleware/auth";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import roomRoutes from "./routes/room";
import carRoutes from "./routes/car";
import messageRoutes from "./routes/message";
import reviewRoutes from "./routes/review";
import uploadRoutes from "./routes/upload";
import chatRoutes from "./routes/chat";
import { setupMessageSocket } from "./controllers/messageSocket";
import { apiLimiter } from "./middleware/rateLimiter";

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// trust proxy when deployed behind Render / Vercel / other proxies
app.set("trust proxy", true);

// canonical list of allowed origins (include full scheme)
const ALLOWED_ORIGINS = [
  "https://ijara-hub.vercel.app",
  "https://ijarahub.ddns.net",
  "https://ec2-34-194-4-168.compute-1.amazonaws.com",
  "https://34.194.4.168",
  "http://localhost:3000",
] as const;

type AllowedOrigin = (typeof ALLOWED_ORIGINS)[number];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (curl, server-to-server)
    if (!origin) return callback(null, true);

    if (ALLOWED_ORIGINS.includes(origin as AllowedOrigin)) {
      return callback(null, true);
    }

    console.warn(`CORS: origin not allowed: ${origin}`);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  exposedHeaders: ["Authorization", "x-csrf-token"],
};

// apply CORS before other middleware/routes
app.use(cors(corsOptions));
// ensure preflight OPTIONS requests return proper headers
app.options("*", cors(corsOptions));

// body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// debug logging middleware (remove or lower level in production)
app.use((req: Request, _res: Response, next: NextFunction) => {
  if (req.headers.origin) {
    console.debug(
      `Incoming request: ${req.method} ${req.path} from ${req.headers.origin}`
    );
  }
  next();
});

// Apply general rate limiting to all API routes
app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/server-auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/messages", authenticateToken, messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);

// Socket.IO: use same origins list (must be exact origins)
const io = new SocketIOServer(server, {
  cors: {
    origin: ALLOWED_ORIGINS as unknown as string[],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
  transports: ["polling", "websocket"],
  // allowEIO3 is sometimes required when clients use older Socket.IO versions
  // keep if you need backward compatibility
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Socket setup
setupMessageSocket(io);

// Generic error handler (CORS errors will surface here on server side)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err && err.message ? err.message : err);
  if (err && err.message && err.message.includes("CORS")) {
    return res.status(403).json({ error: "CORS Error", message: err.message });
  }
  res
    .status(err?.status || 500)
    .json({
      error: "Internal Server Error",
      message: err?.message || "Unknown error",
    });
});

server.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port} in ${config.environment} mode`
  );
});
