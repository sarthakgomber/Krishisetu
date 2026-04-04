"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import ChatWindow from "@/components/chat/ChatWindow";
import Spinner from "@/components/ui/Spinner";

function BuyerChatInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");
  const farmerParam = searchParams.get("farmer");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState(roomParam || null);
  const [activeFarmer, setActiveFarmer] = useState(null);

  useEffect(() => {
    api.get("/api/orders")
      .then((orders) => {
        const seen = new Set();
        const unique = (orders || []).filter((o) => {
          const key = `${o.farmer?.id}_${o.product?.id}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setConversations(unique);
        if (roomParam) {
          const productId = roomParam.split("_")[1];
          const match = unique.find((o) => o.product?.id === productId);
          if (match) setActiveFarmer(match.farmer);
          else if (farmerParam) setActiveFarmer({ id: farmerParam, name: "Farmer" });
        }
      })
      .finally(() => setLoading(false));
  }, [roomParam, farmerParam]);

  function selectRoom(order) {
    setActiveRoom(`${user?.id}_${order.product?.id}`);
    setActiveFarmer(order.farmer);
  }

  return (
    <div className="flex h-screen bg-cream">
      {/* Sidebar */}
      <div className="w-72 shrink-0 border-r border-[var(--border)] bg-white flex flex-col">
        <div className="p-5 border-b border-[var(--border)]">
          <span className="text-leaf-600 text-xs font-semibold uppercase tracking-widest block mb-1">Messages</span>
          <h2 className="font-display text-lg font-semibold text-earth">Conversations</h2>
        </div>
        {loading ? (
          <div className="flex justify-center pt-10"><Spinner /></div>
        ) : conversations.length === 0 ? (
          <div className="text-center p-8 text-muted text-sm leading-relaxed">
            <div className="text-3xl mb-3">💬</div>
            No conversations yet.<br />Open a product and click &ldquo;Chat with Farmer&rdquo;.
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {conversations.map((order) => {
              const room = `${user?.id}_${order.product?.id}`;
              const isActive = activeRoom === room;
              return (
                <button
                  key={room}
                  onClick={() => selectRoom(order)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors border-b border-[var(--border)] ${
                    isActive ? "bg-leaf-50 border-l-2 border-l-leaf-500" : "hover:bg-soil-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-leaf-100 flex items-center justify-center shrink-0 border border-leaf-200">
                    <span className="text-leaf-700 font-bold text-sm">
                      {(order.farmer?.farmName || order.farmer?.name)?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${isActive ? "text-leaf-700" : "text-earth"}`}>
                      {order.farmer?.farmName || order.farmer?.name}
                    </p>
                    <p className="text-xs text-muted truncate">{order.product?.name}</p>
                  </div>
                  {isActive && <div className="ml-auto w-2 h-2 bg-leaf-500 rounded-full shrink-0" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1">
        {activeRoom && user ? (
          <ChatWindow
            roomId={activeRoom}
            userId={user.id}
            otherUser={{ id: activeFarmer?.id, name: activeFarmer?.farmName || activeFarmer?.name }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-leaf-50 rounded-3xl flex items-center justify-center text-4xl mb-4 border border-leaf-200">💬</div>
            <p className="font-display text-xl font-semibold text-earth">Select a conversation</p>
            <p className="text-muted text-sm mt-2 max-w-xs">Or open a product and click &ldquo;Chat with Farmer&rdquo; to start a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuyerChatPage() {
  return (
    <Suspense fallback={<div className="flex justify-center pt-32"><Spinner /></div>}>
      <BuyerChatInner />
    </Suspense>
  );
}