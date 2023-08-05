import { io } from "socket.io-client";

export const initSocket = async (backendURL) => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };

  return io(backendURL, options);
};
