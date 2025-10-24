"use client";
import { Send } from "lucide-react";
import { useState, forwardRef, useImperativeHandle, useRef } from "react";

interface ChatFormProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

// Wrap component with forwardRef
const ChatForm = forwardRef(({ onSubmit, isLoading }: ChatFormProps, ref) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      textareaRef.current?.focus();
    },
  }));

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSubmit(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const capitalizedValue = value.replace(/(^\w|[.!?]\s+\w)/g, (l) =>
      l.toUpperCase()
    );
    setInput(capitalizedValue);
  };

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-amber-500 max-h-32"
          rows={1}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className={`p-2 rounded-lg ${
            !input.trim() || isLoading
              ? "bg-gray-200 text-gray-500"
              : "bg-amber-500 text-white hover:bg-amber-600"
          } transition-colors`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

ChatForm.displayName = "ChatForm";
export default ChatForm;
