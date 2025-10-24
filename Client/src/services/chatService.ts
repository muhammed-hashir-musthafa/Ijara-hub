import api from '@/lib/api';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatResponse {
  success: boolean;
  response?: string;
  error?: string;
}

class ChatService {
  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const { data } = await api.post('/chat', { message });
      // console.log('Chat service response:', data);
      return {
        success: true,
        response: data.data.response // Access response from the nested data object
      };
    } catch (error) {
      console.error('Chat service error:', error);
      return {
        success: false,
        error: 'Unable to process your message. Please try again later.'
      };
    }
  }
}

export const chatService = new ChatService();
export default chatService;