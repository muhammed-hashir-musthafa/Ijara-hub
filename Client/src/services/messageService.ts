import { AxiosResponse } from 'axios';
import api from '../lib/api';
import { Message, Conversation, CreateConversationPayload } from '../types/message';

// Message Service
export const getConversations = async (): Promise<{ conversations: Conversation[] }> => {
  const response: AxiosResponse = await api.get('/message/conversations');
  return response.data;
};

export const getMessages = async (conversationId: string): Promise<{ messages: Message[] }> => {
  const response: AxiosResponse = await api.get(`/message/conversations/${conversationId}/messages`);
  return response.data;
};

export const createConversation = async (payload: CreateConversationPayload): Promise<{ message: string; conversation: Conversation }> => {
  const response: AxiosResponse = await api.post('/message/conversations', payload);
  return response.data;
};

export const markAsRead = async (conversationId: string): Promise<{ message: string }> => {
  const response: AxiosResponse = await api.patch(`/message/conversations/${conversationId}/read`);
  return response.data;
};

export const deleteMessage = async (messageId: string): Promise<{ message: string }> => {
  const response: AxiosResponse = await api.delete(`/message/messages/${messageId}`);
  return response.data;
};