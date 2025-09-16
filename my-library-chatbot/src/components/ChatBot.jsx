import React, { useState } from "react";
import { getChatbotResponse } from "../api/chat";
import Message from "./Message";
import { MessageCircle, X } from "lucide-react"; // ✅ nice icons

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false); // chat open/close toggle
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! I’m your Library Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const botReply = await getChatbotResponse(input);

    setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">📚 Library Chat Assistant</span>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <X size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 h-80 overflow-y-auto p-3 bg-gray-50 space-y-2">
            {messages.map((msg, i) => (
              <Message key={i} from={msg.from} text={msg.text} />
            ))}
            {loading && <Message from="bot" text="Typing..." />}
          </div>

          {/* Input box */}
          <div className="flex items-center border-t border-gray-200 p-2 bg-white">
            <input
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="ml-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition disabled:opacity-50"
              onClick={handleSend}
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
