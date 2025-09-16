import React from "react";
import ChatBot from "../components/ChatBot";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">📚 Welcome to My Library</h1>
      <p className="mt-2">Explore our digital resources and services.</p>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
}
