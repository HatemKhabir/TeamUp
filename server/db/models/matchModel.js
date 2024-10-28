import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema({
  // MongoDB automatically provides a unique _id for each document
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat"
  },
  hostUsername: {
    type: String,
    lowercase: true
  },
  sportType: {
    type: String,
    required: true
  },
  eventTitle: String,
  eventDescription: String,
  playersList: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  status: {
    type: Boolean,
    default: true
  },
  location: String,
  date: {
    type: Date,
    required: true // Ensure a date is always provided
  },
  playersNumber: {
    type: Number,
    required: true, // Ensure number of players is provided
    min: 1, // At least one player required
  },
  price: {
    type: Number,
    default: 0 // Default price if not provided
  },
  gameCode: {
    type: String,
    unique: true,
    required: true
  },
}, 
{ timestamps: true });

const Match = mongoose.model("Match", matchSchema, "matches");

export default Match;
