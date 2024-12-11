import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import Chat from "./db/models/chatModel.js";

let io;
export const initSocket = (server) => {
  io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    const token = socket.handshake.query.token;

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return socket.disconnect();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id; // Store user ID in socket

      console.log(`User connected: ${socket.userId}, Socket ID: ${socket.id}`);

      socket.on("joinChat", async (chatId) => {
        try {
          const updatedChat = await Chat.findByIdAndUpdate(
            chatId,{$addToSet:{openedBy:socket.userId}}
          );
          io.to(chatId).emit('updatedChat', updatedChat);
          } catch (e) {
          console.log(e);
        }
        socket.join(chatId);
        console.log(`User ${socket.userId} joined room: ${chatId}`);
      });
      socket.on("leaveChat", (chatId) => {
        socket.leave(chatId);
        console.log(`User ${socket.userId} left room: ${chatId}`);
      });
      socket.on("disconnect", () => {
        console.log(`User ${socket.userId} disconnected`);
      });
    } catch (err) {
      console.log("Invalid token:", err);
      socket.disconnect();
    }
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized!");
  }
  return io;
};
