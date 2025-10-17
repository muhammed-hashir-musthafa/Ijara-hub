import express from "express";
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from "../controllers/room";
import { authenticateToken, authorizeRoles } from "../middleware/auth";
import { uploadLimiter } from "../middleware/rateLimiter";

const router = express.Router();

// Public routes
router.get("/", getRooms);
router.get("/:id", getRoomById);

// Protected routes
router.use(authenticateToken);

// Create room (owner/admin only)
router.post("/", uploadLimiter, authorizeRoles("owner", "admin"), createRoom);

// Update room (owner/admin only)
router.put("/:id", uploadLimiter, authorizeRoles("owner", "admin"), updateRoom);

// Delete room (owner/admin only)
router.delete("/:id", authorizeRoles("owner", "admin"), deleteRoom);

export default router;