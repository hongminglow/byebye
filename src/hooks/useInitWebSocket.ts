import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const useInitWebSocket = () => {
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  const { readyState } = useWebSocket(import.meta.env.VITE_SOCKET_URL, {
    onOpen: () => console.log("WebSocket connected"),
    onClose: () => console.log("WebSocket disconnected"),
    onMessage: (event) => {
      setMessageHistory((prev) => [...prev, event.data]);
    },
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log(
        "websocket message history:",
        JSON.stringify(messageHistory, null, 2)
      );
    }
  }, [readyState, messageHistory]);
};
