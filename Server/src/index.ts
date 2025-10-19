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
import { setupMessageSocket } from "./controllers/messageSocket";
import { apiLimiter } from "./middleware/rateLimiter";



// Initialize Express app
const app = express();
const server = http.createServer(app);

// Set up Socket.IO with CORS
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH"],
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? ["https://yourdomain.com"] 
    : ["http://localhost:3000"],
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Apply general rate limiting to all API routes
app.use("/api", apiLimiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/messages", authenticateToken, messageRoutes);
app.use("/api/reviews", reviewRoutes);

// Socket.IO setup
setupMessageSocket(io);

// Start the server
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port} in ${config.environment} mode`);
});
