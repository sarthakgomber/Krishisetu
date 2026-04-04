"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import ChatWindow from "@/components/chat/ChatWindow";
import Spinner from "@/components/ui/Spinner";

function FarmerChatInner() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const roomParam = searchParams.get("room");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRoom, setActiveRoom] = useState(roomParam || null);
  const [activeBuyer, setActiveBuyer] = useState(null);

  useEffect(() => {
    api.get("/api/orders")
      .then((orders) => {
        const seen = new Set();
        const unique = (orders || []).filter((o) => {
          const key = `${o.buyer?.id}_${o.product?.id}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        setConversations(unique);
        if (roomParam) {
          const buyerId = roomParam.split("_")[0];
          const match = unique.find((o) => o.buyer?.id === buyerId);
          if (match) setActiveBuyer(match.buyer);
        }
      })
      .finally(() => setLoading(false));
  }, [roomParam]);

  function selectRoom(order) {
    setActiveRoom(`${order.buyer?.id}_${order.product?.id}`);
    setActiveBuyer(order.buyer);
  }

  return (
    <div className="flex h-screen">
      <div className="w-72 shrink-0 border-r border-[var(--border)] bg-white flex flex-col">
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="font-display text-lg font-semibold text-earth">Messages</h2>
        </div>
        {loading ? (
          <div className="flex justify-center pt-10"><Spinner /></div>
        ) : conversations.length === 0 ? (
          <div className="text-center p-6 text-muted text-sm">No conversations yet.</div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {conversations.map((order) => {
              const room = `${order.buyer?.id}_${order.product?.id}`;
              return (
                <button key={room} onClick={() => selectRoom(order)} className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-soil-50 transition-colors border-b border-[var(--border)] ${activeRoom === room ? "bg-leaf-50" : ""}`}>
                  <div className="w-9 h-9 rounded-full bg-soil-100 flex items-center justify-center shrink-0">
                    <span className="text-soil-700 font-semibold text-sm">{order.buyer?.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-earth truncate">{order.buyer?.name}</p>
                    <p className="text-xs text-muted truncate">{order.product?.name}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex-1">
        {activeRoom && user ? (
          <ChatWindow roomId={activeRoom} userId={user.id} otherUser={{ id: activeBuyer?.id, name: activeBuyer?.name }} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-3">💬</div>
            <p className="font-display text-xl font-semibold text-earth">Select a conversation</p>
            <p className="text-muted text-sm mt-1">Choose from the list on the left.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FarmerChatPage() {
  return (
    <Suspense fallback={<div className="flex justify-center pt-32"><Spinner /></div>}>
      <FarmerChatInner />
    </Suspense>
  );
}