import { Message } from './message';

interface Attachment {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

interface MessageResponse {
  success: boolean;
  message?: Message;
  error?: string;
}

interface ReadResponse {
  success: boolean;
  count?: number;
  error?: string;
}

export interface SocketEvents {
  'message:send': (data: {
    conversationId: string;
    receiverId: string;
    content: string;
    messageType?: 'text' | 'image' | 'file';
    attachments?: Attachment[];
    replyTo?: string;
  }, callback?: (response: MessageResponse) => void) => void;

  'message:read': (data: {
    conversationId: string;
  }, callback?: (response: ReadResponse) => void) => void;

  'conversation:join': (conversationId: string) => void;
  'typing:start': (conversationId: string) => void;
  'typing:stop': (conversationId: string) => void;
}

export interface SocketListeners {
  'message:new': (message: Message) => void;
  'message:read': (data: { conversationId: string; readerId: string }) => void;
  'typing:start': (data: { userId: string }) => void;
  'typing:stop': (data: { userId: string }) => void;
  'connect': () => void;
  'disconnect': () => void;
  'connect_error': (error: Error) => void;
}