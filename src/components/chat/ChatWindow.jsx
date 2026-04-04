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
      <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-[var(--border)]">
        <div className="w-9 h-9 rounded-full bg-leaf-100 flex items-center justify-center">
          <span className="text-leaf-700 font-semibold text-sm">
            {otherUser?.name?.charAt(0)?.toUpperCase() || "?"}
          </span>
        </div>
        <div>
          <p className="font-medium text-sm text-earth">{otherUser?.name || "Chat"}</p>
          <p className="text-xs text-muted">via KrishiSetu</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
        {loading ? (
          <div className="flex justify-center pt-10"><Spinner /></div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center pt-10">
            <div className="text-4xl mb-3">💬</div>
            <p className="text-sm font-medium text-earth">Start the conversation</p>
            <p className="text-xs text-muted mt-1">Ask about availability, negotiate price, or arrange delivery.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id || msg._id}
              message={msg}
              isOwn={
                (msg.sender?.id || msg.sender?._id || msg.senderId) === userId
              }
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
