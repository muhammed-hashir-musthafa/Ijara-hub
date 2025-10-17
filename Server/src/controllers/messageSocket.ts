import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { Message, Conversation } from "../models/message";

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

export const setupMessageSocket = (io: Server) => {
  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) throw new Error("No token provided");
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      socket.userId = decoded.id;
      socket.userRole = decoded.role;
      next();
    } catch (error) {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket: AuthenticatedSocket) => {
    console.log(`User ${socket.userId} connected`);
    
    // Join user to their personal room
    socket.join(`user_${socket.userId}`);

    // Join conversation
    socket.on("conversation:join", (conversationId: string) => {
      socket.join(`conversation_${conversationId}`);
    });

    // Send message
    socket.on("message:send", async (data) => {
      try {
        const { conversationId, receiverId, content, messageType = "text", attachments, replyTo } = data;
        
        const message = new Message({
          conversationId,
          sender: socket.userId,
          receiver: receiverId,
          content,
          messageType,
          attachments,
          replyTo,
          isDelivered: true,
          deliveredAt: new Date()
        });
        
        await message.save();
        await message.populate("sender", "fname lname profileImage");
        
        // Update conversation
        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: message._id,
          lastMessageAt: new Date()
        });
        
        // Emit to conversation room
        io.to(`conversation_${conversationId}`).emit("message:new", message);
        
        // Emit to receiver
        io.to(`user_${receiverId}`).emit("message:notification", {
          conversationId,
          message
        });
        
      } catch (error) {
        socket.emit("message:error", { error: "Failed to send message" });
      }
    });

    // Mark as read
    socket.on("message:read", async (messageId: string) => {
      try {
        await Message.findByIdAndUpdate(messageId, {
          isRead: true,
          readAt: new Date()
        });
        
        socket.broadcast.emit("message:read", { messageId });
      } catch (error) {
        socket.emit("message:error", { error: "Failed to mark as read" });
      }
    });

    // Typing indicators
    socket.on("typing:start", (conversationId: string) => {
      socket.to(`conversation_${conversationId}`).emit("typing:start", {
        userId: socket.userId
      });
    });

    socket.on("typing:stop", (conversationId: string) => {
      socket.to(`conversation_${conversationId}`).emit("typing:stop", {
        userId: socket.userId
      });
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.userId} disconnected`);
    });
  });
};