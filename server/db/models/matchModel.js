import mongoose, { Schema } from "mongoose"

const matchSchema = mongoose.Schema({
  matchID: { 
    type: String, 
    unique: true },
  chat:{type:Schema.Types.ObjectId,
  ref:"Chat"},
  //this will be fetched from the logged in user already not from database
  hostUsername:{
    type:String,
    lowercase:true},
  sportType:{
    type:String,
    required:true
  },
  eventTitle: String,
  eventDescription:String,
  playersList: [{type:Schema.Types.ObjectId,
    ref:'Player'
  }],
  status: Boolean,
  location:String,
  date: Date,
  playersNumber:Number,
  price:Number,
  // considering using "timestamp" --not sure though
},
{ timestamps: true })
const Match = mongoose.model("Match", matchSchema, "matches")


export default Match
