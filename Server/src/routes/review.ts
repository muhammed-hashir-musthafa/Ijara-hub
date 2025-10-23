import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import {
  createReview,
  getReviewsByProperty,
  updateReview,
  deleteReview,
} from "../controllers/review";

const router = Router();

// Create review (authenticated)
router.post("/", authenticateToken, createReview);

// Get reviews by property (public)
router.get("/:propertyType/:propertyId", getReviewsByProperty);

// Update review (authenticated, owner only)
router.put("/:id", authenticateToken, updateReview);

// Delete review (authenticated, owner only)
router.delete("/:id", authenticateToken, deleteReview);

export default router;