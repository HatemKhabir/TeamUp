import mongoose, { Schema } from "mongoose";

const messagesSchema = mongoose.Schema(
  {
    senderID: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: true, // Ensure that every message has a sender
    },
    content: {
      type: String,
      trim: true,
      required: true, // Ensure the content is not empty
    },
    chat: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
      required: true, // Every message should belong to a chat
    },
    readBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      }
    ]    
  },
  { timestamps: true }
);

messagesSchema.index({ senderID: 1 });
messagesSchema.index({ chat: 1 });

const Message = mongoose.model("Message", messagesSchema, "messages");

export default Message;
