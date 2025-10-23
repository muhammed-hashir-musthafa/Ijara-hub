"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/base/ui/card";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Search,
  Check,
  CheckCheck,
  Clock,
  Users,
  Paperclip,
  X,
} from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { getConversations, getMessages } from "@/services/messageService";
import { Conversation, Message, SendMessagePayload } from "@/types/message";
import { User } from "@/types/auth";
import { getProfile } from "@/services/authService";

const MessagingContainer = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const socket = useSocket();
  const searchParams = useSearchParams();

  const fetchCurrentUser = async () => {
    try {
      const response = await getProfile();
      setCurrentUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const fetchConversations = useCallback(async () => {
    try {
      const response = await getConversations();
      const conversations = response?.data?.conversations || [];
      setConversations(conversations);

      // Auto-select conversation if conversationId is provided in URL
      const conversationId = searchParams.get("conversationId");
      if (conversationId && conversations.length > 0) {
        const targetConversation = conversations.find(
          (conv) => conv._id === conversationId
        );
        if (targetConversation) {
          setSelectedConversation(targetConversation);
          // Clear the conversationId from URL after auto-selection
          const url = new URL(window.location.href);
          url.searchParams.delete("conversationId");
          window.history.replaceState({}, "", url.toString());
        }
      }
    } catch (error) {
      console.error("Failed to fetch conversations:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  const fetchMessages = useCallback(
    async (conversationId: string) => {
      try {
        const response = await getMessages(conversationId);
        setMessages(response.data?.messages || []);
        // Mark messages as read when opening conversation
        if (socket && socket.connected) {
          socket.emit(
            "message:read",
            { conversationId },
            (response: { success: boolean }) => {
              if (response?.success) {
                // Update conversation list to reflect read status
                fetchConversations();
              }
            }
          );
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    },
    [socket, fetchConversations]
  );

  useEffect(() => {
    fetchCurrentUser();
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (selectedConversation && socket) {
      fetchMessages(selectedConversation._id);
      socket.emit("conversation:join", selectedConversation._id);
      inputRef.current?.focus();
    }
  }, [selectedConversation, socket, fetchMessages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: Message) => {
      if (message.conversationId === selectedConversation?._id) {
        setMessages((prev) => {
          // Avoid duplicates
          const exists = prev.some((m) => m._id === message._id);
          if (exists) return prev;
          return [...prev, message];
        });
        // Auto-mark as read if conversation is currently selected
        if (socket && socket.connected) {
          socket.emit("message:read", {
            conversationId: message.conversationId,
          });
        }
      }
      // Always refresh conversations to update unread counts
      fetchConversations();
    };

    const handleTypingStart = ({ userId }: { userId: string }) => {
      if (userId !== currentUser?._id) {
        setTypingUsers((prev) => new Set(prev).add(userId));
      }
    };

    const handleTypingStop = ({ userId }: { userId: string }) => {
      setTypingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    };

    socket.on("message:new", handleNewMessage);
    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);

    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("typing:start", handleTypingStart);
      socket.off("typing:stop", handleTypingStop);
    };
  }, [socket, selectedConversation, currentUser, fetchConversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedConversation || !socket || !currentUser)
      return;

    const otherParticipant = selectedConversation.participants.find(
      (p) => p._id !== currentUser._id
    );

    if (otherParticipant) {
      const messageData: SendMessagePayload = {
        conversationId: selectedConversation._id,
        receiverId: otherParticipant._id,
        content: newMessage.trim(),
        messageType: "text",
      };

      socket.emit(
        "message:send",
        messageData,
        (response: { success: boolean; error?: string }) => {
          if (!response?.success) {
            console.error("Failed to send message:", response?.error);
          }
        }
      );
      setNewMessage("");
    }
  }, [newMessage, selectedConversation, socket, currentUser]);

  const handleTyping = useCallback(() => {
    if (!socket || !selectedConversation) return;

    socket.emit("typing:start", selectedConversation._id);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing:stop", selectedConversation._id);
    }, 1000);
  }, [socket, selectedConversation]);

  const getInitials = (fname: string, lname: string) => {
    return `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "from-orange-500 to-red-500",
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-emerald-500 to-teal-500",
      "from-indigo-500 to-purple-500",
      "from-amber-500 to-orange-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getStatusIcon = (message: Message) => {
    if (message.isRead) return CheckCheck;
    if (message.isDelivered) return Check;
    return Clock;
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)] overflow-hidden">
      {/* Conversations Sidebar */}
      <Card className="lg:col-span-1 bg-white/80 backdrop-blur-lg border-0 shadow-xl overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-gray-50 border-0 focus:bg-white transition-all duration-300 rounded-xl"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations?.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No conversations yet
              </div>
            ) : (
              conversations?.map((conversation) => {
                const otherParticipant = conversation?.participants?.find(
                  (p) => p._id !== currentUser?._id
                );
                if (!otherParticipant) return null;

                const fullName = `${otherParticipant?.fname} ${otherParticipant?.lname}`;
                const initials = getInitials(
                  otherParticipant?.fname,
                  otherParticipant?.lname
                );
                const avatarGradient = getAvatarColor(fullName);

                return (
                  <div
                    key={conversation._id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 ${
                      selectedConversation?._id === conversation._id
                        ? "bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-amber-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {otherParticipant.profileImage ? (
                          <Image
                            src={otherParticipant.profileImage}
                            alt={fullName}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover shadow-md"
                          />
                        ) : (
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                          >
                            {initials}
                          </div>
                        )}
                        <div className="absolute -top-1 -right-1">
                          <Users className="h-4 w-4 text-amber-600 bg-white rounded-full p-0.5" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {fullName}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {conversation.lastMessageAt &&
                              formatTime(new Date(conversation.lastMessageAt))}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-600 truncate flex-1">
                            {conversation.lastMessage?.content ||
                              "No messages yet"}
                          </p>
                          {(() => {
                            const unreadCount =
                              conversation.unreadCount instanceof Map
                                ? conversation.unreadCount.get(
                                    currentUser?._id || ""
                                  ) || 0
                                : (
                                    conversation.unreadCount as Record<
                                      string,
                                      number
                                    >
                                  )?.[currentUser?._id || ""] || 0;
                            return unreadCount > 0 ? (
                              <span className="bg-amber-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center ml-2">
                                {unreadCount > 99 ? "99+" : unreadCount}
                              </span>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Area */}
      {selectedConversation ? (
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-lg border-0 shadow-xl overflow-hidden">
          <CardContent className="p-0 h-full flex flex-col overflow-hidden relative">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const otherParticipant =
                      selectedConversation.participants.find(
                        (p) => p._id !== currentUser?._id
                      );
                    if (!otherParticipant) return null;

                    const fullName = `${otherParticipant.fname} ${otherParticipant.lname}`;
                    const initials = getInitials(
                      otherParticipant.fname,
                      otherParticipant.lname
                    );
                    const avatarGradient = getAvatarColor(fullName);

                    return (
                      <>
                        {otherParticipant.profileImage ? (
                          <Image
                            src={otherParticipant.profileImage}
                            alt={fullName}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white font-bold text-sm`}
                          >
                            {initials}
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {fullName}
                          </h3>
                          {typingUsers.size > 0 && (
                            <p className="text-sm text-amber-600">Typing...</p>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" disabled>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" disabled>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedConversation(null)}
                    className="hover:bg-red-100 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
              {messages?.map((message) => {
                const isOwn = message.sender._id === currentUser?._id;
                const StatusIcon = getStatusIcon(message);

                return (
                  <div
                    key={message._id}
                    className={`flex ${
                      isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        isOwn
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`flex items-center justify-between mt-1 text-xs ${
                          isOwn ? "text-amber-100" : "text-gray-500"
                        }`}
                      >
                        <span>{formatTime(message.createdAt)}</span>
                        {isOwn && <StatusIcon className="h-3 w-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm z-10 shadow-lg">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" disabled>
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  ref={inputRef}
                  value={newMessage}
                  onChange={(e) => {
                    const value = e.target.value;
                    const capitalized =
                      value.charAt(0).toUpperCase() + value.slice(1);
                    setNewMessage(capitalized);
                    handleTyping();
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  className="flex-1 border-0 bg-gray-50 focus:bg-white transition-all duration-300 rounded-xl"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-lg border-0 shadow-xl">
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p>Select a conversation to start messaging</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MessagingContainer;
