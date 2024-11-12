import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  record: {
    volleyball: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 }
    },
    football: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 }
    },
    basketball: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 }
    },
    tabletennis: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 }
    },
    tennis: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 }
    },
    padel: {
      wins: { type: Number, default: 0 },
      losses: { type: Number, default: 0 }
    }
  },
  matchJoined: [{
    type: Schema.Types.ObjectId,
    ref: "Match",
    default: null
  }],
  isPremium:{
    type:Boolean,
    default:false,
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Player = mongoose.model("Player", userSchema, "players");

export default Player;
