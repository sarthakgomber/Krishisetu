"use client";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";

let pusherInstance = null;

function getPusher() {
  if (!pusherInstance) {
    pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
  }
  return pusherInstance;
}

export function usePusher(channelName, eventName, onEvent) {
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    if (!channelName) return;

    const pusher = getPusher();
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, (data) => onEventRef.current(data));

    return () => {
      channel.unbind(eventName);
      pusher.unsubscribe(channelName);
    };
  }, [channelName, eventName]);
}
