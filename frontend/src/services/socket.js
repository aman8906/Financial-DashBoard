import { io } from "socket.io-client";

export const socket = io("https://financial-dashboard-lrnp.onrender.com", {
  transports: ["websocket"]
});
