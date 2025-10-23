import express from "express";
import { getUsers, getUserById, updateUser, deleteUser, getOwnerProfile } from "../controllers/user";
import { authenticateToken, authorizeRoles } from "../middleware/auth";

const router = express.Router();

// Public routes
// Get owner profile with stats (public for room/car detail pages)
router.get("/:id/profile", getOwnerProfile);

// All other routes require authentication
router.use(authenticateToken);

// Get all users (admin only)
router.get("/", authorizeRoles("admin"), getUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user (admin only)
router.delete("/:id", authorizeRoles("admin"), deleteUser);

export default router;