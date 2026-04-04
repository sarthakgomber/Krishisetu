"use client";
import { useState, useRef } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
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
    <div className={`flex items-end gap-3 px-4 py-3 border-t border-[var(--border)] bg-white transition-all duration-200 ${focused ? "shadow-[0_-4px_16px_rgba(44,24,16,0.06)]" : ""}`}>
      <div className="flex-1 relative">
        <textarea
          ref={ref}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Type a message… (Enter to send)"
          rows={1}
          disabled={disabled}
          className="w-full bg-soil-50 border border-[var(--border)] rounded-2xl px-4 py-2.5 text-sm text-earth placeholder:text-muted leading-relaxed resize-none max-h-32 overflow-y-auto outline-none focus:border-leaf-400 focus:bg-white focus:ring-2 focus:ring-leaf-100 transition-all"
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
          }}
        />
      </div>
      <button
        onClick={submit}
        disabled={!text.trim() || disabled}
        className="shrink-0 w-10 h-10 rounded-xl bg-leaf-600 text-white flex items-center justify-center hover:bg-leaf-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-warm"
        title="Send message"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
        </svg>
      </button>
    </div>
  );
}