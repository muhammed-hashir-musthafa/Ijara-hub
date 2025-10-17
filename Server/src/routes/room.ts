import express from "express";
import { getRooms, getRoomById, createRoom, updateRoom, deleteRoom } from "../controllers/room";
import { authenticateToken, authorizeRoles } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getRooms);
router.get("/:id", getRoomById);

// Protected routes
router.use(authenticateToken);

// Create room (owner/admin only)
router.post("/", authorizeRoles("owner", "admin"), createRoom);

// Update room (owner/admin only)
router.put("/:id", authorizeRoles("owner", "admin"), updateRoom);

// Delete room (owner/admin only)
router.delete("/:id", authorizeRoles("owner", "admin"), deleteRoom);

export default router;