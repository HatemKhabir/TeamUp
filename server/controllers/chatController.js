import mongoose from "mongoose";
import Chat from "../db/models/chatModel.js";
import Player from "../db/models/playerModel.js";
import Match from "../db/models/matchModel.js";
import Message from "../db/models/messageModel.js";

///////////////////////////////////////// Either initialize a new chat or access an old one between 2 users
export const accessChat = async (req, res) => {
  const { userId, loggedInUser, content } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "UserId doesn't exist" });
  }

  try {
    // Find an existing chat between the two users
    let chatFound = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: loggedInUser } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMsg");

    // Populate latest message sender details
    chatFound = await Chat.populate(chatFound, { path: "latestMsg.senderID", select: "username" });

    // If a chat is found, return it
    if (chatFound.length > 0) {
      return res.status(200).json(chatFound);
    } else {
      // Create a new chat
      const newChatData = {
        isGroupChat: false,
        users: [loggedInUser, userId],
      };
      const chatCreated = await Chat.create(newChatData);

      // Create the first message in the chat if content is provided
      if (content) {
        const messageData = {
          senderID: loggedInUser,
          content: content,
          chat: chatCreated._id,
        };
        const message = await Message.create(messageData);

        // Update chat with the latest message
        await Chat.findByIdAndUpdate(chatCreated._id, { latestMsg: message });
      }

      // Populate chat with users and latest message details
      const populatedChat = await Chat.findById(chatCreated._id)
        .populate("users", "username")
        .populate("latestMsg");

      return res.status(200).json(populatedChat);
    }
  } catch (err) {
    return res.status(503).json({ message: err.message });
  }
};

///////////////////////////////////////// Return all chats for a user
export const fetchChats = async (req, res) => {
  const loggedInUser = req.query.loggedInUser;

  try {
    const userChats = await Chat.find({
      users: { $elemMatch: { $eq: loggedInUser } },
    })
      .populate("users", "username")
      .populate("latestMsg")
      .populate("eventId", "eventTitle");

    // Populate the latest message sender details
    const populatedChats = await Chat.populate(userChats, {
      path: "latestMsg.senderID",
      select: "username",
    });

    // Sort chats by updated timestamp
    const sortedChats = populatedChats.sort((a, b) => b.updatedAt - a.updatedAt);

    return res.status(200).json(sortedChats);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

///////////////////////////////////////// Initialize a new event chat after creation
export const createEventChat = async (req, res) => {
  const { eventId, loggedInUser } = req.body;

  try {
    const match = await Match.findOne({ _id: eventId });

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    const foundChat = await Chat.findOne({ eventId: match._id });

    if (!foundChat) {
      const newChat = await Chat.create({
        eventId: match._id,
        isGroupChat: true,
        users: [loggedInUser],
      });

      const populatedChat = await Chat.populate(newChat, [
        { path: "users", select: "username" },
        { path: "eventId", select: "eventTitle" },
      ]);

      return res.status(200).json(populatedChat);
    } else {
      return res.status(200).json({ message: "Match chat already exists" });
    }
  } catch (err) {
    return res.status(503).json({ message: err.message });
  }
};

///////////////////////////////////////// Fetch an event chat after clicking the event infos
export const fetchEventChat = async (req, res) => {
  const { eventId } = req.body;

  try {
    const event = await Match.findOne({ _id: eventId }).select("_id");

    if (event) {
      const chat = await Chat.findOne({ eventId: event._id, isGroupChat: true })
        .populate("users", "username")
        .populate("eventId", "eventTitle");

      if (chat) {
        return res.status(200).json(chat);
      } else {
        return res.status(404).json({ message: "Event chat not found" });
      }
    } else {
      return res.status(404).json({ message: "Match not found" });
    }
  } catch (err) {
    return res.status(503).json({ message: err.message });
  }
};

///////////////////////////////////////// Delete a chat (either group or personal)
export const deleteChat = async (req, res) => {
  const chatId = req.query.chatId;

  try {
    const deletedChat = await Chat.findByIdAndDelete(chatId);

    if (deletedChat) {
      return res.status(200).json({ message: "Chat deleted successfully" });
    } else {
      return res.status(404).json({ message: "Chat not found" });
    }
  } catch (err) {
    return res.status(503).json({ message: err.message });
  }
};

///////////////////////////////////////// Add user to an event chat (by joining the event)
export const addUserEventChat = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { eventId: eventId },
      { $addToSet: { users: userId } },
      { new: true }
    )
      .populate("users", "username")
      .populate("eventId", "eventTitle");

    if (updatedChat) {
      return res.status(200).json(updatedChat);
    } else {
      return res.status(404).json({ message: "Event chat not found" });
    }
  } catch (err) {
    return res.status(503).json({ message: err.message });
  }
};

///////////////////////////////////////// Remove user from an event chat (by leaving the event)
export const removeFromEventChat = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { eventId: eventId },
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "username");

    if (updatedChat) {
      return res.status(200).json(updatedChat);
    } else {
      return res.status(404).json({ message: "Event chat not found" });
    }
  } catch (err) {
    return res.status(503).json({ message: err.message });
  }
};
