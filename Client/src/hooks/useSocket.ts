import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { getCookie } from '@/lib/cookies';

let globalSocket: Socket | null = null;

export const useSocket = () => {
  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      console.log('No token found');
      return;
    }

    if (!globalSocket) {
      console.log('Connecting to socket server...');
      
      globalSocket = io('http://localhost:5000', {
        auth: { token },
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 2000
      });

      globalSocket.on('connect', () => {
        console.log('Socket connected');
      });

      globalSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      globalSocket.on('connect_error', (error) => {
        console.error('Connection failed:', error.message);
      });
    }
  }, []);

  return globalSocket;
};