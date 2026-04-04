"use client";
import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Spinner from "@/components/ui/Spinner";

export default function ChatWindow({ roomId, userId, otherUser }) {
  const { messages, loading, sendMessage } = useChat(roomId, userId);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-cream">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-[var(--border)] shadow-warm-sm">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-leaf-100 border-2 border-leaf-200 flex items-center justify-center">
            <span className="text-leaf-700 font-bold text-sm">
              {otherUser?.name?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-earth">{otherUser?.name || "Chat"}</p>
          <p className="text-xs text-leaf-600 font-medium">via KrishiSetu · Online</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted bg-soil-50 border border-[var(--border)] px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-leaf-500 rounded-full" />
          Negotiate directly
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-1 scrollbar-hide">
        {loading ? (
          <div className="flex justify-center pt-16"><Spinner /></div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <div className="w-16 h-16 bg-leaf-50 border-2 border-leaf-100 rounded-3xl flex items-center justify-center text-3xl mb-4">💬</div>
            <p className="font-display text-lg font-semibold text-earth mb-1">Start the conversation</p>
            <p className="text-xs text-muted max-w-xs leading-relaxed">Ask about availability, negotiate price, or arrange delivery — all in one place.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <span className="text-[10px] text-muted bg-soil-100 border border-[var(--border)] px-3 py-1 rounded-full">
                Conversation started
              </span>
            </div>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id || msg._id}
                message={msg}
                isOwn={(msg.sender?.id || msg.sender?._id || msg.senderId) === userId}
              />
            ))}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}