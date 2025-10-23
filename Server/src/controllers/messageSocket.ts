import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Message, Conversation } from "../models/message";

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

const connectedUsers = new Map<string, string>();

export const setupMessageSocket = (io: Server) => {
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error("Authentication required"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      if (!decoded?.id || !mongoose.Types.ObjectId.isValid(decoded.id)) {
        return next(new Error("Invalid credentials"));
      }

      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      next();
    } catch (error) {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", async (socket: AuthenticatedSocket) => {
    const userId = socket.userId!;
    console.log(`User ${userId} connected`);

    connectedUsers.set(socket.id, userId);
    socket.join(`user_${userId}`);

    try {
      const userConversations = await Conversation.find(
        { participants: new mongoose.Types.ObjectId(userId) },
        "_id"
      );
      userConversations.forEach((conv) => {
        socket.join(`conversation_${conv._id}`);
      });
    } catch (error) {
      console.error("Error joining conversations:", error);
    }

    // Join specific conversation on demand
    socket.on("conversation:join", (conversationId: string) => {
      socket.join(`conversation_${conversationId}`);
    });

    socket.on("message:send", async (data, callback) => {
      try {
        console.log(`Message send attempt from user ${userId}:`, data);
        const { conversationId, receiverId, content, messageType = "text", attachments, replyTo } = data;

        if (!conversationId || !receiverId || !content?.trim()) {
          console.log('Missing required fields:', { conversationId, receiverId, content: !!content?.trim() });
          return callback?.({ success: false, error: "Missing required fields" });
        }

        if (!mongoose.Types.ObjectId.isValid(conversationId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
          console.log('Invalid IDs:', { conversationId, receiverId });
          return callback?.({ success: false, error: "Invalid IDs" });
        }

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          console.log('Conversation not found:', conversationId);
          return callback?.({ success: false, error: "Conversation not found" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const isParticipant = conversation.participants.some(p => p.equals(userObjectId));
        if (!isParticipant) {
          console.log('User not authorized for conversation:', { userId, conversationId });
          return callback?.({ success: false, error: "Unauthorized" });
        }

        const message = new Message({
          conversationId: new mongoose.Types.ObjectId(conversationId),
          sender: new mongoose.Types.ObjectId(userId),
          receiver: new mongoose.Types.ObjectId(receiverId),
          content: content.trim(),
          messageType,
          attachments,
          replyTo: replyTo ? new mongoose.Types.ObjectId(replyTo) : undefined,
          isDelivered: true,
          deliveredAt: new Date()
        });

        const saved = await message.save();
        await saved.populate("sender", "fname lname profileImage");
        console.log('Message saved successfully:', saved._id);

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: saved._id,
          lastMessageAt: new Date(),
          $inc: { [`unreadCount.${receiverId}`]: 1 }
        });

        console.log('Emitting message to conversation room:', `conversation_${conversationId}`);
        io.to(`conversation_${conversationId}`).emit("message:new", saved);
        callback?.({ success: true, message: saved });
      } catch (error) {
        console.error("Send message error:", error);
        callback?.({ success: false, error: "Send failed" });
      }
    });

    socket.on("message:read", async ({ conversationId }, callback) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(conversationId)) {
          return callback?.({ success: false, error: "Invalid ID" });
        }

        const updated = await Message.updateMany(
          { conversationId: new mongoose.Types.ObjectId(conversationId), receiver: new mongoose.Types.ObjectId(userId), isRead: false },
          { isRead: true, readAt: new Date() }
        );

        await Conversation.findByIdAndUpdate(conversationId, {
          [`unreadCount.${userId}`]: 0
        });

        socket.to(`conversation_${conversationId}`).emit("message:read", {
          conversationId,
          readerId: userId
        });

        callback?.({ success: true, count: updated.modifiedCount });
      } catch (error) {
        console.error("Read message error:", error);
        callback?.({ success: false, error: "Read failed" });
      }
    });

    let typingTimeout: NodeJS.Timeout;

    socket.on("typing:start", (conversationId: string) => {
      if (mongoose.Types.ObjectId.isValid(conversationId)) {
        socket.to(`conversation_${conversationId}`).emit("typing:start", { userId });
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
          socket.to(`conversation_${conversationId}`).emit("typing:stop", { userId });
        }, 3000);
      }
    });

    socket.on("typing:stop", (conversationId: string) => {
      if (mongoose.Types.ObjectId.isValid(conversationId)) {
        clearTimeout(typingTimeout);
        socket.to(`conversation_${conversationId}`).emit("typing:stop", { userId });
      }
    });

    socket.on("disconnect", () => {
      clearTimeout(typingTimeout);
      connectedUsers.delete(socket.id);
      console.log(`User ${userId} disconnected`);
    });
  });
};
