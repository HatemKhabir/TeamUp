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
      socket.userId = decoded.id;

      console.log(`User connected: ${socket.userId}, Socket ID: ${socket.id}`);

      // Join personal room for notifications and chats
      socket.join(socket.userId);
      console.log(`User ${socket.userId} joined their personal room`);

      // Join all user's chat rooms on connection
      socket.on("joinUserChats", async (chatIds) => {
        chatIds.forEach(chatId => {
          socket.join(chatId);
          console.log(`User ${socket.userId} joined chat: ${chatId}`);
        });
      });

      socket.on("joinChat", async (chatId) => {
        try {
          const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $addToSet: { openedBy: socket.userId } },
            { new: true }
          ).populate('latestMsg');

          socket.join(chatId);
          io.to(chatId).emit('updatedChat', updatedChat);
          // Also emit to user's personal room for chat list update
          io.to(socket.userId).emit('chatListUpdate', updatedChat);
        } catch (e) {
          console.log(e);
        }
      });

      socket.on("newMessage", async (chatId) => {
        try {
          const updatedChat = await Chat.findById(chatId).populate('latestMsg');
          io.to(chatId).emit('messageReceived', updatedChat);
          // Emit to all participants for chat list update
          updatedChat.users.forEach(userId => {
            io.to(userId.toString()).emit('chatListUpdate', updatedChat);
          });
        } catch (e) {
          console.log(e);
        }
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
