import express from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../controllers/user";
import { authenticateToken, authorizeRoles } from "../middleware/auth";

const router = express.Router();

// All routes require authentication
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