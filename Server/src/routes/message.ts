import express from "express";
import { 
  getConversations, 
  getMessages, 
  createConversation, 
  markAsRead, 
  deleteMessage 
} from "../controllers/message";

const router = express.Router();

// Get user conversations
router.get("/conversations", getConversations);

// Get messages in conversation
router.get("/conversations/:conversationId/messages", getMessages);

// Create conversation
router.post("/conversations", createConversation);

// Mark messages as read
router.patch("/conversations/:conversationId/read", markAsRead);

// Delete message
router.delete("/messages/:messageId", deleteMessage);

export default router;