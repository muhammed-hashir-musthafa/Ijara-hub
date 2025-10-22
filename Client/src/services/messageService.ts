import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { Message, Conversation, CreateConversationPayload } from '../types/message';

// Message Service
export const getConversations = async (): Promise<{ data: { conversations: Conversation[] } }> => {
  const response: AxiosResponse = await api.get('/messages/conversations');
  return response.data;
};

export const getMessages = async (conversationId: string): Promise<{ data: { messages: Message[] } }> => {
  const response: AxiosResponse = await api.get(`/messages/conversations/${conversationId}/messages`);
  return response.data;
};

export const createConversation = async (payload: CreateConversationPayload): Promise<{ data: { conversation: Conversation } }> => {
  const response: AxiosResponse = await api.post('/messages/conversations', payload);
  return response.data;
};

export const getOrCreateConversation = async (payload: CreateConversationPayload): Promise<{ data: { conversation: Conversation } }> => {
  try {
    // Try to create conversation (will return existing if already exists)
    return await createConversation(payload);
  } catch (error) {
    // If creation fails, try to get existing conversations and find the one with this participant
    const conversations = await getConversations();
    const existingConversation = conversations.data.conversations.find(
      (conv: Conversation) => conv.participants.some(p => p._id === payload.participantId)
    );
    
    if (existingConversation) {
      return {
        data: {
          conversation: existingConversation
        }
      };
    }
    
    throw error;
  }
};

export const markAsRead = async (conversationId: string): Promise<{ message: string }> => {
  const response: AxiosResponse = await api.patch(`/messages/conversations/${conversationId}/read`);
  return response.data;
};

export const deleteMessage = async (messageId: string): Promise<{ message: string }> => {
  const response: AxiosResponse = await api.delete(`/messages/messages/${messageId}`);
  return response.data;
};