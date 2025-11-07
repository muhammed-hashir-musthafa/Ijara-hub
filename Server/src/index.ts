import express from "express";
import http from "http";
import cors from "cors";
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

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Set up Socket.IO with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "http://ijarahub.ddns.net",
            "http://ec2-34-194-4-168.compute-1.amazonaws.com",
            "http://34.194.4.168",
            "https://ijarahub.ddns.net",
            "https://ec2-34-194-4-168.compute-1.amazonaws.com",
          ]
        : ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  },
  transports: ["polling", "websocket"],
  allowEIO3: true,
  pingTimeout: 60000,
  pingInterval: 25000,
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "http://ijarahub.ddns.net",
            "https://ijarahub.ddns.net",
            "http://ec2-34-194-4-168.compute-1.amazonaws.com",
            "https://ec2-34-194-4-168.compute-1.amazonaws.com",
            "http://34.194.4.168",
          ]
        : ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    exposedHeaders: ["Authorization", "x-csrf-token"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Apply general rate limiting to all API routes
app.use("/api", apiLimiter);

// Health check
app.get("/api/health", (req, res) => {
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

// Socket.IO setup
setupMessageSocket(io);

// Start the server
server.listen(config.port, () => {
  console.log(
    `Server running on port ${config.port} in ${config.environment} mode`
  );
});
