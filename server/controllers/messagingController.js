import mongoose from "mongoose";
import Chat from "../db/models/chatModel.js";
import Message from "../db/models/messageModel.js";
import friendShip from "../db/models/friendRelationModel.js";
import { getIO } from "../socket.js";
import Player from "../db/models/playerModel.js";
import Match from "../db/models/matchModel.js";
import { populate } from "dotenv";

export const sendMessage = async (req, res) => {
  const { chatId, messageContent, senderID } = req.body;
  const io = getIO();
  if (!chatId || !messageContent) {
    return res.status(403).json({ message: "Invalid Data Sent" });
  }
  try {
    let newMessage = {
      senderID: senderID,
      content: messageContent,
      chat: chatId,
    };
    let message = await Message.create(newMessage);
    await Message.populate(message, [
      { path: "senderID", select: "username profilePicture" },
      { path: "chat" },
    ]);
    const findChat = await Chat.findOneAndUpdate(
      { _id: chatId },
      { latestMsg: message }
    );
    await Chat.populate(findChat, { path: "latestMsg", select: "content" });
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: chatId },
      { $pull: { openedBy: { $ne: new mongoose.Types.ObjectId(senderID) } } },
      { new: true }
    );
    if (message && findChat) {
      io.emit("updatedChat", updatedChat);
      io.to(chatId).emit("newMessage", message);
      io.to(chatId).emit('messageReceived', updatedChat);
      
      // Notify all participants for chat list update
      updatedChat.users.forEach(userId => {
        io.to(userId.toString()).emit('chatListUpdate', updatedChat);
      });

      return res.status(201).json(message);
    }
    return res.status(403).json({ message: "something wwong happend" });
  } catch (e) {
    console.log(e);
    return res.status(503).json({ message: e.message });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.query;
  try {
    if (!chatId) {
      return res.status(400).json({ message: "chatId is required" });
    }

    const messages = await Message.find({ chat: chatId }).populate(
      "senderID",
      "username profilePicture"
    );

    return res.status(200).json(messages);
  } catch (e) {
    console.log(e);
    return res.status(503).json({ message: e.message });
  }
};

export const getPrivateMessage = async (req, res) => {
  const { friendShipId } = req.query;

  try {
    if (!friendShipId) {
      return res.status(400).json({ message: "friendship id is unavailable" });
    }

    const friendship = await friendShip.findOne({
      _id: friendShipId,
      type: "accepted",
    });

    if (!friendship) {
      return res
        .status(404)
        .json({ message: "No chat exists between the users." });
    }
    if (!friendship.chat) {
      return res
        .status(404)
        .json({ message: "Chat not initialized for this friendship." });
    }
    const messages = await Message.find({ chat: friendship.chat }).populate(
      "senderID",
      "username profileImage"
    );

    return res.status(200).json(messages);
  } catch (e) {
    console.error("Error fetching private messages:", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getLastMessage = async (req, res) => {
  const { friendshipsChats } = req.query;
  if (!friendshipsChats || !Array.isArray(friendshipsChats)) {
    return res.status(400).json({ error: "Invalid request data" });
  }
  try {
    const chats = await Chat.find({ _id: { $in: friendshipsChats } }).populate({
      path: "latestMsg",
      populate: { path: "senderID", select: "username" },
    });
    res.status(200).json(chats);
  } catch (e) {
    console.error("Error fetching last messages:", e);
    res.status(500).json({ e: "Internal server error" });
  }
};

export const getLobbyChat = async (req, res) => {
  const { userId } = req.query;
  try {
    const player = await Player.findById(userId);
    if (!player) {
      return res.status(404).json({ error: "Player not found!" });
    }
    const joinedMatches = await Match.find({
      _id: { $in: player.matchJoined },
    }).populate({
      path: "chat",
      populate: [
        {
          path: "latestMsg",
          populate: {
            path: "senderID",
            select: "username"
          }
        },
        {
          path: "eventId",
          select: "eventTitle gamePicCover status"
        }
      ]
    });
    if (joinedMatches.length > 0) {
      return res.status(200).json(joinedMatches.filter((match)=>match.status=='upcoming'));
    }
    return res.status(201).json("");
  } catch (e) {
    console.error("Error fetching events:", e);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};
