import express from "express";
import { adminLogin, login, ownerSignup, renterSignup, logout, getProfile, googleAuth } from "../controllers/auth";
import { authenticateToken } from "../middleware/auth";
import { authLimiter } from "../middleware/rateLimiter";

const router = express.Router();

// Public routes with auth rate limiting
router.post("/admin/login", authLimiter, adminLogin);
router.post("/login", authLimiter, login);
router.post("/owner/signup", authLimiter, ownerSignup);
router.post("/renter/signup", authLimiter, renterSignup);
router.post("/google", authLimiter, googleAuth);

// Protected routes
router.post("/logout", authenticateToken, logout);
router.get("/profile", authenticateToken, getProfile);

export default router;