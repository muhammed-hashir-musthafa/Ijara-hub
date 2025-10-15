import express from "express";
import { adminLogin, login, ownerSignup, renterSignup, logout, getProfile } from "../controllers/auth";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// Public routes
router.post("/admin/login", adminLogin);
router.post("/login", login);
router.post("/owner/signup", ownerSignup);
router.post("/renter/signup", renterSignup);

// Protected routes
router.post("/logout", authenticateToken, logout);
router.get("/profile", authenticateToken, getProfile);

export default router;