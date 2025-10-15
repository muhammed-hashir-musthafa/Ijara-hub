import { Request, Response } from "express";
import { Message, Conversation } from "../models/message";
import mongoose from "mongoose";

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Get conversations for a user
export const getConversations = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    const conversations = await Conversation.find({
      participants: userId,
      isActive: true
    })
    .populate("participants", "fname lname profileImage")
    .populate("lastMessage")
    .populate("propertyId")
    .sort({ lastMessageAt: -1 });

    res.json({ conversations });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

// Get messages in a conversation
export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    
    const messages = await Message.find({
      conversationId,
      isDeleted: false
    })
    .populate("sender", "fname lname profileImage")
    .populate("replyTo")
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

    res.json({ messages: messages.reverse() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Create or get conversation
export const createConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { participantId, propertyId, propertyType } = req.body;
    const userId = req.user?.id;
    
    // Check if conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] }
    });
    
    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, participantId],
        propertyId,
        propertyType,
        unreadCount: new Map()
      });
      await conversation.save();
    }
    
    res.json({ conversation });
  } catch (error) {
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

// Mark messages as read
export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.id;
    
    await Message.updateMany(
      {
        conversationId,
        receiver: userId,
        isRead: false
      },
      {
        isRead: true,
        readAt: new Date()
      }
    );
    
    // Update unread count
    await Conversation.findByIdAndUpdate(conversationId, {
      [`unreadCount.${userId}`]: 0
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark messages as read" });
  }
};

// Delete message
export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { messageId } = req.params;
    const userId = req.user?.id;
    
    const message = await Message.findOneAndUpdate(
      { _id: messageId, sender: userId },
      { isDeleted: true, deletedAt: new Date() }
    );
    
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete message" });
  }
};