import express from "express";
import { getCars, getCarById, createCar, updateCar, deleteCar } from "../controllers/car";
import { authenticateToken, authorizeRoles } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getCars);
router.get("/:id", getCarById);

// Protected routes
router.use(authenticateToken);

// Create car (owner/admin only)
router.post("/", authorizeRoles("owner", "admin"), createCar);

// Update car (owner/admin only)
router.put("/:id", authorizeRoles("owner", "admin"), updateCar);

// Delete car (owner/admin only)
router.delete("/:id", authorizeRoles("owner", "admin"), deleteCar);

export default router;