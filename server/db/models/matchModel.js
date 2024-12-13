import mongoose, { Schema } from "mongoose";

const matchSchema = new Schema({
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
    enum:['football','volleyball','tabletennis','padel','tennis','basketball'],
    required: true
  },
  eventTitle:{
   type:String,
   required:true
  },
  eventDescription:{
    type:String,
    required:true
  },
  playersList: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  status: {
    type: String,
    enum:['upcoming','finished'],
    default: true
  },
  location: {
    type:String,
  required:true
},
  date: {
    type: Date,
    required: true
  },
  playersNumber: {
    type: Number,
    required: true,
    min: 1, 
  },
  price: {
    type: Number,
    default: 0
  },
  gameCode: {
    type: String,
  },
  skillLevel: {
    type: [String],
    enum: ['Beginners', 'Average', 'Semi-Pro', 'Professional'],
    required: true
  },
  gender:{
    type:String,
    enum:['male','female','mixed'],
    required:true
  },
  privacy:{
    type:String,
    enum:['private','public'],
    required:true
  },
  gamePicCover: {
    type: String,
    default: 'https://img.freepik.com/premium-photo/sports-background-advertising-sport-life-concept-generative-ai_1002555-984.jpg' // Default image URL
  },
  winners:[
    {type:Schema.Types.ObjectId,
      ref:'Player'
    }
  ],
  losers:[
    {type:Schema.Types.ObjectId,
      ref:'Player'
    }
  ]
}, 
{ timestamps: true });

const Match = mongoose.model("Match", matchSchema, "matches");

export default Match;
