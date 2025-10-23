import { Request, Response } from "express";
import { Message, Conversation } from "../models/message";
import mongoose from "mongoose";
import { successResponse, errorResponse } from "../utils/responseHandler";

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
    if (!userId) {
      return errorResponse(res, 401, "User not authenticated");
    }
    
    const conversations = await Conversation.find({
      participants: userId,
      isActive: true
    })
    .populate("participants", "fname lname profileImage")
    .populate({
      path: "lastMessage",
      populate: { path: "sender", select: "fname lname" }
    })
    .sort({ lastMessageAt: -1 });

    return successResponse(res, "Conversations fetched successfully", { conversations });
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch conversations", error);
  }
};

// Get messages in a conversation
export const getMessages = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const userId = req.user?.id;
    
    if (!userId) {
      return errorResponse(res, 401, "User not authenticated");
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return errorResponse(res, 400, "Invalid conversation ID");
    }

    // Verify user is participant
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId
    });

    if (!conversation) {
      return errorResponse(res, 403, "Access denied to this conversation");
    }
    
    const totalItems = await Message.countDocuments({ conversationId, isDeleted: false });
    const messages = await Message.find({
      conversationId,
      isDeleted: false
    })
    .populate("sender", "fname lname profileImage")
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip((Number(page) - 1) * Number(limit));

    const pagination = {
      currentPage: Number(page),
      totalPages: Math.ceil(totalItems / Number(limit)),
      totalItems
    };

    return successResponse(res, "Messages fetched successfully", { messages: messages.reverse() }, pagination);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch messages", error);
  }
};

// Create or get conversation
export const createConversation = async (req: AuthRequest, res: Response) => {
  try {
    const { participantId, propertyId, propertyType } = req.body;
    const userId = req.user?.id;
    
    if (!userId) {
      return errorResponse(res, 401, "User not authenticated");
    }

    if (!participantId) {
      return errorResponse(res, 400, "Participant ID is required");
    }

    if (userId === participantId) {
      return errorResponse(res, 400, "Cannot create conversation with yourself");
    }
    
    // Check if conversation exists
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, participantId] }
    }).populate("participants", "fname lname profileImage");
    
    if (!conversation) {
      conversation = new Conversation({
        participants: [userId, participantId],
        propertyId,
        propertyType,
        unreadCount: new Map()
      });
      await conversation.save();
      await conversation.populate("participants", "fname lname profileImage");
    }
    
    return successResponse(res, "Conversation retrieved successfully", { conversation });
  } catch (error) {
    return errorResponse(res, 500, "Failed to create conversation", error);
  }
};

// Mark messages as read
export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return errorResponse(res, 401, "User not authenticated");
    }

    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      return errorResponse(res, 400, "Invalid conversation ID");
    }
    
    const result = await Message.updateMany(
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
    
    return successResponse(res, "Messages marked as read successfully", { 
      updatedCount: result.modifiedCount 
    });
  } catch (error) {
    return errorResponse(res, 500, "Failed to mark messages as read", error);
  }
};

// Delete message
export const deleteMessage = async (req: AuthRequest, res: Response) => {
  try {
    const { messageId } = req.params;
    const userId = req.user?.id;
    
    if (!userId) {
      return errorResponse(res, 401, "User not authenticated");
    }

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return errorResponse(res, 400, "Invalid message ID");
    }
    
    const message = await Message.findOneAndUpdate(
      { _id: messageId, sender: userId },
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    
    if (!message) {
      return errorResponse(res, 404, "Message not found or unauthorized");
    }
    
    return successResponse(res, "Message deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete message", error);
  }
};