export interface Message {
  _id: string
  conversationId: string
  sender: {
    _id: string
    fname: string
    lname: string
    profileImage?: string
  }
  receiver: string
  content: string
  messageType: 'text' | 'image' | 'file' | 'system'
  attachments?: {
    fileName: string
    fileUrl: string
    fileType: string
    fileSize: number
  }[]
  isRead: boolean
  readAt?: Date
  isDelivered: boolean
  deliveredAt?: Date
  replyTo?: string
  createdAt: Date
  updatedAt: Date
}

export interface Conversation {
  _id: string
  participants: {
    _id: string
    fname: string
    lname: string
    profileImage?: string
  }[]
  propertyId?: string
  propertyType?: 'Room' | 'Car'
  lastMessage?: Message
  lastMessageAt: Date
  unreadCount: Map<string, number>
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CreateConversationPayload {
  participantId: string
  propertyId?: string
  propertyType?: 'Room' | 'Car'
}

export interface SendMessagePayload {
  conversationId: string
  receiverId: string
  content: string
  messageType?: 'text' | 'image' | 'file'
  attachments?: {
    fileName: string
    fileUrl: string
    fileType: string
    fileSize: number
  }[]
  replyTo?: string
}