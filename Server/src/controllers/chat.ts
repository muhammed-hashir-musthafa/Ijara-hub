import { Request, Response } from 'express';
import { ChatService } from '../service/chatService';
import { successResponse, errorResponse } from '../utils/responseHandler';

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  processMessage = async (req: Request, res: Response): Promise<void> => {
    try {
      const { message, userId } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        errorResponse(res, 400, 'Message is required');
        return;
      }

      const response = await this.chatService.processMessage(message.trim(), userId);
      
      successResponse(res, 'Message processed successfully', {
        response,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Chat controller error:', error);
      errorResponse(res, 500, 'Chat service unavailable. Please try again later.', error);
    }
  };
}

export const chatController = new ChatController();