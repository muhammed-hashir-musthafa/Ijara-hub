"use client";

import { useState, useEffect, useCallback } from "react";
import { useSocket } from "./useSocket";
import { getConversations, getMessages, markAsRead } from "@/services/messageService";
import { Conversation, Message, SendMessagePayload } from "@/types/message";
import { User } from "@/types/auth";
import { getProfile } from "@/services/authService";
import toast from "react-hot-toast";

export const useMessaging = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await getProfile();
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }, []);

  const fetchConversations = useCallback(async () => {
    try {
      const response = await getConversations();
      setConversations(response.data.conversations);
      if (!selectedConversation && response.data.conversations.length > 0) {
        setSelectedConversation(response.data.conversations[0]);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      toast.error('Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  }, [selectedConversation]);

  const fetchMessages = useCallback(async (conversationId: string) => {
    try {
      const response = await getMessages(conversationId);
      setMessages(response.data.messages);
      await markAsRead(conversationId);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (content.trim() && selectedConversation && socket && currentUser) {
      const otherParticipant = selectedConversation.participants.find(
        p => p._id !== currentUser._id
      );
      
      if (otherParticipant) {
        const messageData: SendMessagePayload = {
          conversationId: selectedConversation._id,
          receiverId: otherParticipant._id,
          content,
          messageType: 'text'
        };

        socket.emit('message:send', messageData);
      }
    }
  }, [selectedConversation, socket, currentUser]);

  const handleTyping = useCallback(() => {
    if (socket && selectedConversation) {
      socket.emit('typing:start', selectedConversation._id);
      setTimeout(() => {
        socket.emit('typing:stop', selectedConversation._id);
      }, 3000);
    }
  }, [socket, selectedConversation]);

  useEffect(() => {
    fetchCurrentUser();
    fetchConversations();
  }, [fetchCurrentUser, fetchConversations]);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation._id);
      if (socket) {
        socket.emit('conversation:join', selectedConversation._id);
      }
    }
  }, [selectedConversation, socket, fetchMessages]);

  useEffect(() => {
    if (socket) {
      socket.on('message:new', (message: Message) => {
        if (message.conversationId === selectedConversation?._id) {
          setMessages(prev => [...prev, message]);
        }
        fetchConversations();
      });

      socket.on('typing:start', ({ userId }: { userId: string }) => {
        setTypingUsers(prev => new Set(prev).add(userId));
      });

      socket.on('typing:stop', ({ userId }: { userId: string }) => {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      });

      return () => {
        socket.off('message:new');
        socket.off('typing:start');
        socket.off('typing:stop');
      };
    }
  }, [socket, selectedConversation, fetchConversations]);

  return {
    conversations,
    selectedConversation,
    setSelectedConversation,
    messages,
    typingUsers,
    currentUser,
    isLoading,
    sendMessage,
    handleTyping
  };
};