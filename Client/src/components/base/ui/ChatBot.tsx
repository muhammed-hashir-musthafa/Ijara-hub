"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Bot, User } from "lucide-react";
import { chatService, type ChatMessage } from "@/services/chatService";
import ChatForm from "../forms/ChatForm";

export default function ChatBot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "Hi! I'm your Ijara Hub assistant. Ask me about rooms, cars, or our platform! 🏠🚗",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Automatically focus the textarea when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const textarea = chatContainerRef.current?.querySelector("textarea");
        textarea?.focus();
      }, 150);
    }
  }, [isOpen]);

  const handleSubmit = async (message: string) => {
    const userMessage = { text: message, isUser: true, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // console.log('Sending message to chat service:', message);
      const response = await chatService.sendMessage(message);
      // console.log('ChatBot received response:', response);
      setMessages((prev) => [
        ...prev,
        {
          text: response.success
            ? response.response!
            : response.error ||
              "Sorry, I'm having trouble right now. Please try again!",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "Connection error. Please check your internet and try again.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatContainerRef}
          className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 h-96 flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold text-sm">Ijara Hub Assistant</h3>
                <p className="text-xs opacity-90">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    msg.isUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      msg.isUser
                        ? "bg-amber-500 text-white"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    }`}
                  >
                    {msg.isUser ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Bot className="w-3 h-3" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.isUser
                        ? "bg-amber-500 text-white rounded-br-md"
                        : "bg-white text-gray-800 rounded-bl-md shadow-sm border"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Form */}
          <ChatForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-full shadow-2xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:scale-110 group"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        )}
      </button>
    </div>
  );
}
