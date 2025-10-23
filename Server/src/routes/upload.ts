import express from "express";
import { uploadSingle as uploadSingleMiddleware, uploadMultiple as uploadMultipleMiddleware } from "../middleware/upload";
import { uploadSingle, uploadMultiple, deleteFile, getFileUrl } from "../controllers/uploadController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// Upload single file
router.post("/single", authenticateToken, uploadSingleMiddleware, uploadSingle);

// Upload multiple files
router.post("/multiple", authenticateToken, uploadMultipleMiddleware, uploadMultiple);

// Get file URL (public access for viewing images)
router.get("/url/:key", getFileUrl);

// Delete file
router.delete("/:key", authenticateToken, deleteFile);

export default router;