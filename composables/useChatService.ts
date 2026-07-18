import { io, Socket } from "socket.io-client";
import { ref, onUnmounted } from "vue";
import { useNotification } from "./useNotification";
import type { UserType } from "~/types/UserTypes";

export interface ChatMessage {
  from: Partial<UserType>;
  message: string;
}

export const useChatService = (token: string) => {
  const user = useAuthUser().getUserState.user;
  const socket = ref<Socket | null>(null);
  const messages = ref<ChatMessage[]>([]);
  const isConnected = ref(false);
  const userCount = ref<number>(0);
  const { fireNotification } = useNotification();

  const connect = () => {
    // ✅ Prevent duplicate connections
    if (socket.value && socket.value.connected) return;

    if (!token) {
      console.warn("⚠️ No token provided for chat connection");
      return;
    }

    socket.value = io("http://localhost:8080", {
      query: { token: token.replace(/^bearer\s+/i, "") },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socket.value.on("connect", () => {
      isConnected.value = true;
      console.log("✅ Connected to chat server");
    });

    socket.value.on("disconnect", () => {
      isConnected.value = false;
      console.warn("❌ Disconnected from chat server");
    });

    socket.value.on("connect_error", (err) => {
      console.error("🚨 Chat connection error:", err.message);
    });

    socket.value.on("userCount", (count: number) => {
      userCount.value = count;
    });

    // 📩 Receive messages
    socket.value.on("message", (data: ChatMessage) => {
      if (data.from.id !== user?.id) messages.value.push(data);
    });
  };

  const sendMessage = (message: string) => {
    if (!socket.value || !isConnected.value) {
      fireNotification("error", "Not connected to chat");
      return;
    }

    socket.value.emit("message", { message, from: socket.value.id });
    messages.value.push({ from: { name: "me" }, message });
  };

  onUnmounted(() => {
    socket.value?.disconnect();
    socket.value = null;
  });

  // ❌ Don't auto-connect here; let component call connect() manually
  // connect();

  return {
    socket,
    isConnected,
    messages,
    sendMessage,
    userCount,
    connect, // ✅ expose so component can control when to connect
  };
};
