import mongoose, { Model } from "mongoose";

export interface IMessage {
  conversationId: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  content: string;
  messageType: "text" | "image" | "file" | "system";
  attachments?: {
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }[];
  isRead: boolean;
  readAt?: Date | null;
  isDelivered: boolean;
  deliveredAt?: Date | null;
  isDeleted: boolean;
  deletedAt?: Date | null;
  replyTo?: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConversation {
  participants: mongoose.Types.ObjectId[];
  propertyId?: mongoose.Types.ObjectId;
  propertyType?: "Room" | "Car";
  lastMessage?: mongoose.Types.ObjectId;
  lastMessageAt: Date;
  isActive: boolean;
  unreadCount: Map<string, number>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageMethods {}
export interface IConversationMethods {}

export type MessageModel = Model<IMessage, {}, IMessageMethods>;
export type ConversationModel = Model<IConversation, {}, IConversationMethods>;

// Socket.IO event types
export interface SocketEvents {
  "message:send": (data: {
    conversationId: string;
    receiverId: string;
    content: string;
    messageType?: "text" | "image" | "file";
    attachments?: any[];
    replyTo?: string;
  }) => void;
  
  "message:delivered": (messageId: string) => void;
  "message:read": (messageId: string) => void;
  "conversation:join": (conversationId: string) => void;
  "conversation:leave": (conversationId: string) => void;
  "typing:start": (conversationId: string) => void;
  "typing:stop": (conversationId: string) => void;
}

export interface SocketData {
  userId: string;
  userRole: string;
}