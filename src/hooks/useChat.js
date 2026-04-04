"use client";
import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import { usePusher } from "./usePusher";

export function useChat(roomId, userId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;
    setLoading(true);
    api.get(`/api/messages/${roomId}`)
      .then((data) => setMessages(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [roomId]);

  usePusher(`private-chat-${roomId}`, "message", (incoming) => {
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === incoming.id);
      return exists ? prev : [...prev, incoming];
    });
  });

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || !roomId) return;
    try {
      const saved = await api.post(`/api/messages/${roomId}`, { content });
      setMessages((prev) => {
        const exists = prev.some((m) => m.id === saved.id);
        return exists ? prev : [...prev, saved];
      });
    } catch (err) {
      console.error("Send failed:", err);
    }
  }, [roomId]);

  return { messages, loading, sendMessage };
}
