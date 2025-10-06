"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Mic,
  Smile,
  Search,
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Check,
  CheckCheck,
  Image,
  FileText,
  Camera,
  Plus,
  Users,
  Shield,
  Clock,
  Crown,
  Sparkles,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const mockContacts = [
  {
    id: 1,
    name: "Sophia Al-Rashid",
    role: "Property Manager",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b8b5?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Your Burj Khalifa suite is ready for check-in",
    time: "2m",
    unread: 2,
    online: true,
    type: "host",
  },
  {
    id: 2,
    name: "Ahmed Hassan",
    role: "Concierge Manager",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Your Lamborghini is being prepared",
    time: "15m",
    unread: 0,
    online: true,
    type: "concierge",
  },
  {
    id: 3,
    name: "Marina Petrov",
    role: "Guest Relations",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Thank you for choosing our premium service",
    time: "1h",
    unread: 0,
    online: false,
    type: "support",
  },
  {
    id: 4,
    name: "Omar Al-Zahra",
    role: "VIP Coordinator",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    lastMessage: "Your helicopter tour is confirmed",
    time: "3h",
    unread: 1,
    online: true,
    type: "vip",
  },
];

const mockMessages = [
  {
    id: 1,
    sender: "host",
    message:
      "Welcome to Dubai! Your luxury suite at Burj Khalifa is ready. The view is absolutely spectacular today! 🌟",
    time: "10:30 AM",
    status: "read",
    type: "text",
  },
  {
    id: 2,
    sender: "user",
    message: "Thank you! I'm very excited. What time can I check in?",
    time: "10:32 AM",
    status: "delivered",
    type: "text",
  },
  {
    id: 3,
    sender: "host",
    message:
      "You can check in anytime after 3 PM. I'll personally ensure everything is perfect for your arrival.",
    time: "10:35 AM",
    status: "read",
    type: "text",
  },
  {
    id: 4,
    sender: "host",
    message: "suite-interior.jpg",
    time: "10:36 AM",
    status: "read",
    type: "image",
    imageUrl:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    sender: "user",
    message: "Wow, that looks incredible! Perfect.",
    time: "10:38 AM",
    status: "delivered",
    type: "text",
  },
  {
    id: 6,
    sender: "host",
    message:
      "I've also arranged complimentary champagne and fresh roses for your arrival. Is there anything specific you'd like me to prepare?",
    time: "10:40 AM",
    status: "delivered",
    type: "text",
  },
];

const MessagePage = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "user",
        message: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
        type: "text",
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMessage = {
          id: messages.length + 2,
          sender: "host",
          message: "Thank you for your message! I'll get back to you shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: "delivered",
          type: "text",
        };
        setMessages((prev) => [...prev, replyMessage]);
      }, 2000);
    }
  };

  const getContactIcon = (type) => {
    switch (type) {
      case "vip":
        return Crown;
      case "concierge":
        return Star;
      case "support":
        return Shield;
      default:
        return Users;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return CheckCheck;
      case "read":
        return CheckCheck;
      case "sent":
        return Check;
      default:
        return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-24 from-gray-50 via-white to-gray-100 relative overflow-auto">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        {/* Top Navigation Icons */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100 transition flex items-center gap-2"
            aria-label="Back"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
            <span className="text-gray-700 font-medium">Back</span>
          </button>
        </div>

        <div className="flex items-center justify-between mb-8 animate-fade-in-down">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-down">
            <div className="flex items-center space-x-4">
              {/* <Button variant="ghost" size="sm" className="md:hidden">
                <ArrowLeft className="h-5 w-5" />
              </Button> */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Messages
                </h1>
                <p className="text-gray-600 font-medium">
                  Connect with your luxury service team
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 px-3 py-1">
                <Sparkles className="h-3 w-3 mr-1" />
                VIP Support
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Contacts Sidebar */}
          <Card className="lg:col-span-1 bg-white/80 backdrop-blur-lg border-0 shadow-xl animate-slide-in-left">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10 bg-gray-50 border-0 focus:bg-white transition-all duration-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Contacts List */}
              <div className="flex-1 overflow-y-auto">
                {mockContacts.map((contact, index) => {
                  const IconComponent = getContactIcon(contact.type);
                  return (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 animate-fade-in-up ${
                        selectedContact.id === contact.id
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 border-r-4 border-amber-500"
                          : ""
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-12 h-12 rounded-full object-cover shadow-md"
                          />
                          {contact.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                          )}
                          <div className="absolute -top-1 -right-1">
                            <IconComponent className="h-4 w-4 text-amber-600 bg-white rounded-full p-0.5" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {contact.name}
                            </h3>
                            <span className="text-xs text-gray-500">
                              {contact.time}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600 truncate">
                              {contact.lastMessage}
                            </p>
                            {contact.unread > 0 && (
                              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-2 py-0.5 animate-bounce">
                                {contact.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-amber-600 font-medium mt-1">
                            {contact.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-lg border-0 shadow-xl animate-slide-in-right">
            <CardContent className="p-0 h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={selectedContact.avatar}
                        alt={selectedContact.name}
                        className="w-10 h-10 rounded-full object-cover shadow-md"
                      />
                      {selectedContact.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedContact.name}
                      </h3>
                      <p className="text-sm text-amber-600 font-medium">
                        {selectedContact.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-white/60 transition-all duration-300 group"
                    >
                      <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-white/60 transition-all duration-300 group"
                    >
                      <Video className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-white/60 transition-all duration-300 group"
                    >
                      <MoreVertical className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50/50">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex animate-message-appear ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`max-w-xs md:max-w-md rounded-2xl px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                          : "bg-white text-gray-800 border border-gray-100"
                      }`}
                    >
                      {message.type === "image" ? (
                        <div className="space-y-2">
                          <img
                            src={message.imageUrl}
                            alt="Shared image"
                            className="w-full rounded-lg object-cover"
                          />
                          <p className="text-sm font-medium">
                            {message.message}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">
                          {message.message}
                        </p>
                      )}
                      <div
                        className={`flex items-center justify-between mt-2 text-xs ${
                          message.sender === "user"
                            ? "text-white/80"
                            : "text-gray-500"
                        }`}
                      >
                        <span>{message.time}</span>
                        {message.sender === "user" && (
                          <div className="flex items-center space-x-1">
                            {React.createElement(
                              getStatusIcon(message.status),
                              {
                                className: `h-3 w-3 ${
                                  message.status === "read"
                                    ? "text-blue-200"
                                    : "text-white/60"
                                }`,
                              }
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-100">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                {/* Attachment Options */}
                {showAttachments && (
                  <div className="flex items-center space-x-2 mb-3 animate-slide-down">
                    {[
                      { icon: Camera, label: "Camera", color: "bg-blue-500" },
                      { icon: Image, label: "Gallery", color: "bg-green-500" },
                      {
                        icon: FileText,
                        label: "Document",
                        color: "bg-purple-500",
                      },
                      { icon: MapPin, label: "Location", color: "bg-red-500" },
                    ].map((option, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className={`${option.color} text-white hover:scale-110 transition-all duration-300 rounded-full w-10 h-10 p-0 animate-bounce-in`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <option.icon className="h-4 w-4" />
                      </Button>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAttachments(!showAttachments)}
                    className="hover:bg-amber-100 transition-all duration-300 group rounded-full"
                  >
                    <Plus
                      className={`h-5 w-5 text-amber-600 transition-transform duration-300 ${
                        showAttachments ? "rotate-45" : "group-hover:rotate-90"
                      }`}
                    />
                  </Button>

                  <div className="flex-1 relative">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      placeholder="Type your message..."
                      className="pl-4 pr-12 py-3 bg-white border-2 border-gray-200 focus:border-amber-500 transition-all duration-300 rounded-2xl shadow-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-amber-100 transition-all duration-300 group rounded-full"
                    >
                      <Smile className="h-5 w-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-amber-100 transition-all duration-300 group rounded-full"
                  >
                    <Mic className="h-5 w-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                  </Button>

                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes message-appear {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-down,
        .animate-fade-in-up,
        .animate-slide-in-left,
        .animate-slide-in-right,
        .animate-message-appear,
        .animate-slide-down,
        .animate-bounce-in,
        .animate-fade-in {
          opacity: 1;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
          opacity: 1;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
          opacity: 1;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          opacity: 1;

          animation-fill-mode: forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
          opacity: 1;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
          opacity: 1;
        }

        .animate-message-appear {
          animation: message-appear 0.4s ease-out;
          opacity: 1;
          animation-fill-mode: forwards;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
          opacity: 1;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          opacity: 1;

          animation-fill-mode: forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
          opacity: 1;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 1;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 1;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
          opacity: 1;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default MessagePage;
