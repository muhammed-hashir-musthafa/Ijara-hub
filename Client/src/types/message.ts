export interface Message {
  _id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  messageType: 'text' | 'image' | 'file'
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Conversation {
  _id: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}

export interface CreateConversationPayload {
  participantId: string
  initialMessage?: string
}

export interface SendMessagePayload {
  content: string
  messageType?: 'text' | 'image' | 'file'
}