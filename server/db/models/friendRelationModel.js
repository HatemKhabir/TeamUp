import mongoose, { Schema } from "mongoose";

const friendShipSchema = mongoose.Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

// Add a compound unique index to prevent duplicate friendships
friendShipSchema.index({ sender: 1, recipient: 1 }, { unique: true });

const friendShip = mongoose.model("friendShip", friendShipSchema, "friends");

export default friendShip;
