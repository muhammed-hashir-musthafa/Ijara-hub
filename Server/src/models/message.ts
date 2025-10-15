import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"]
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file", "system"],
      default: "text"
    },
    attachments: [{
      fileName: String,
      fileUrl: String,
      fileType: String,
      fileSize: Number
    }],
    isRead: {
      type: Boolean,
      default: false,
      index: true
    },
    readAt: {
      type: Date,
      default: null
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    deliveredAt: {
      type: Date,
      default: null
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: {
      type: Date,
      default: null
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }],
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "propertyType"
    },
    propertyType: {
      type: String,
      enum: ["Room", "Car"]
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    },
    lastMessageAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    },
    unreadCount: {
      type: Map,
      of: Number,
      default: {}
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
MessageSchema.index({ conversationId: 1, createdAt: -1 });
MessageSchema.index({ sender: 1, receiver: 1 });
MessageSchema.index({ isRead: 1, receiver: 1 });

ConversationSchema.index({ participants: 1 });
ConversationSchema.index({ propertyId: 1, propertyType: 1 });
ConversationSchema.index({ lastMessageAt: -1 });

// Create compound index for participants
ConversationSchema.index({ "participants.0": 1, "participants.1": 1 }, { unique: true });

const Message = mongoose.model("Message", MessageSchema);
const Conversation = mongoose.model("Conversation", ConversationSchema);

export { Message, Conversation };
export default Message;