"use client";

import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Chat as StreamChat } from "stream-chat-react";
import ChatChannel from "./ChatChannel";
import ChatSidebar from "./ChatSidebar";
import useInitializeChatClient from "./useInitializeChatClient";
import { useSession } from "../SessionProvider";
import { useEffect } from "react";
import { useChatContext } from "stream-chat-react";

export default function Chat() {
  const chatClient = useInitializeChatClient();

  const { resolvedTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!chatClient) {
    return <Loader2 className="mx-auto my-3 animate-spin" />;
  }

  return (
    <main className="relative w-full h-full overflow-hidden rounded-2xl bg-card shadow-sm">
      <div className="absolute bottom-0 top-0 flex w-full h-full">
        <StreamChat
          client={chatClient}
          theme={
            resolvedTheme === "dark"
              ? "str-chat__theme-dark"
              : "str-chat__theme-light"
          }
        >
          <ChatSidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          {/* Auto-select first channel so the Channel window shows by default */}
          <AutoSelectFirstChannel />
          <ChatChannel
            open={!sidebarOpen}
            openSidebar={() => setSidebarOpen(true)}
          />
        </StreamChat>
      </div>
    </main>
  );
}

function AutoSelectFirstChannel() {
  const { user } = useSession();
  const { client, setActiveChannel } = useChatContext();

  useEffect(() => {
    if (!client || !user || !setActiveChannel) return;

    // Query the first channel the user is a member of and set it active
    client
      .queryChannels({ type: "messaging", members: { $in: [user.id] } }, { last_message_at: -1 }, { limit: 1 })
      .then((channels) => {
        if (channels && channels.length > 0) {
          setActiveChannel(channels[0]);
        }
      })
      .catch((err) => console.error("Auto-select channel failed", err));
  }, [client, user, setActiveChannel]);

  return null;
}
