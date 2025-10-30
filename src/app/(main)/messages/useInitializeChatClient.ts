import kyInstance from "@/lib/ky";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { useSession } from "../SessionProvider";

export default function useInitializeChatClient() {
  const { user } = useSession();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    // Nếu không có user, không làm gì cả
    if (!user?.id) {
      return;
    }

    const client = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY!,
    );

    // Biến để theo dõi xem component đã unmount chưa
    let didUserConnect = true;

    client
      .connectUser(
        {
          id: user.id,
          username: user.username,
          name: user.displayName,
          image: user.avatarUrl ?? undefined,
        },
        async () =>
          kyInstance
            .get("/api/get-token")
            .json<{ token: string }>()
            .then((data) => data.token),
      )
      .then(() => {
        // Chỉ set client nếu component vẫn còn mounted
        if (didUserConnect) {
          setChatClient(client);
        }
      })
      .catch((error) => {
        console.error("Failed to connect user", error);
      });

    return () => {
      // Khi component unmount (hoặc user.id thay đổi),
      // ngắt kết nối và dọn dẹp
      didUserConnect = false;
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) => console.error("Failed to disconnect user", error))
        .then(() => console.log("Connection closed"));
    };
  }, [user?.id, user?.username, user?.displayName, user?.avatarUrl]); // <-- THAY ĐỔI QUAN TRỌNG Ở ĐÂY

  return chatClient;
}
