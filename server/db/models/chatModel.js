import mongoose, { Schema } from "mongoose";

const chatSchema = mongoose.Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      required: function() { return this.isGroupChat; }
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      }
    ],
    latestMsg: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

chatSchema.pre("save", function (next) {
  if (!this.isGroupChat && this.users.length > 2) {
    return next(new Error("Private chats can only have two participants."));
  }
  next();
});

const Chat = mongoose.model("Chat", chatSchema, "Chats");

export default Chat;
