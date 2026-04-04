"use client";
import { useState, useRef } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const ref = useRef(null);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
    ref.current?.focus();
  }

  return (
    <div className="flex items-end gap-2 p-4 border-t border-[var(--border)] bg-white">
      <textarea
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message… (Enter to send)"
        rows={1}
        disabled={disabled}
        className="flex-1 input-base resize-none max-h-32 overflow-y-auto py-2.5 text-sm leading-relaxed"
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
        }}
      />
      <button
        onClick={submit}
        disabled={!text.trim() || disabled}
        className="shrink-0 w-10 h-10 rounded-xl bg-leaf-600 text-white flex items-center justify-center hover:bg-leaf-700 disabled:opacity-40 transition-colors"
      >
        <svg className="w-4 h-4 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}
