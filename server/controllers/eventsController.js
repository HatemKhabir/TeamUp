import Match from "../db/models/matchModel.js"
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" // Define characters
import mongoose from "mongoose"
import Player from "../db/models/playerModel.js"
import Chat from "../db/models/chatModel.js";

//generate matchID
function generateGameCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // Generates a 6-character random string
}

export const createEvent = async (req, res) => {
  const newEventData = {
    eventTitle: req.body.eventTitle,
    sportType: req.body.sportType,
    hostUsername: req.body.hostUsername,
    eventDescription: req.body.eventDescription,
    price: req.body.price,
    status: 'upcoming',
    playersList: [],
    location: req.body.location,
    playersNumber: req.body.playersNumber,
    date: req.body.date,
    skillLevel: req.body.level,
    gender: req.body.gender,
    privacy: req.body.privacy
  };
  
  // Conditionally add gameCode for private events
  if (req.body.privacy === 'private') {
    newEventData.gameCode = generateGameCode();
  }
  
  const newEvent = new Match(newEventData);
  
  try {
    const savedEvent = await newEvent.save();
  
    const newChat = new Chat({
      eventId: savedEvent._id,
      isGroupChat: true,
      users: []
    });
    const savedChat = await newChat.save();
    
    savedEvent.chat = savedChat._id;
    await savedEvent.save();
  
    res.status(201).json(savedEvent);
  } catch (e) {
    res.status(403).json({ error: e.message });
  }
}

export const joinEvent = async (req, res) => {
  const matchID = req.body.matchID
  const username=req.body.loggedInUsername
  try {
    const match = await Match.findOne({ matchID })
    const user=await Player.findOne({username:username})
    if (!match) {
      return res.status(200).json("Match Not Found !")
    }
    if (user.matchJoined!="")
    return res.status(200).json("You already have an ongoing game ! ")
    if (match.playersList.length==match.playersNumber)
    return res.status(200).json("Match is already full ! ")
    if (match.hostUsername==username){
      return res.status(200).json("You can't join your own match ? ")
    }
    match.playersList.push(username)
    user.matchJoined=matchID;
    await user.save();
    await match.save();
    res.status(200).json("Match Joined !")
  } catch (error) {
    console.error(error)
    res.status(403).json("An error occurred")
  }
}

export const deleteEvent=async(req,res)=>{
  const matchID = req.query.matchID;
  try {

    const match = await Match.findOne({matchID});
    
    if (!match) {
      return res.status(404).json({ error: "MatchID Not Found" });
    }

    const deleted = await Match.deleteOne({matchID:matchID});

    if (deleted.deletedCount === 1) {
      return res.status(200).json({ message: "Match Deleted!" });
    } else {
      return res.status(404).json({ error: "MatchID Not Found" });
    }
  } catch (error) {
    console.error(error);
        res.status(500).json({error});
  }
}

export const getEvents=async(req,res)=>{
console.log(req.query)
const username=req.query.user;
try{
  const match = await Match.find({hostUsername:username});
  if (!match){
    return res.json("")
  }
  res.status(201).json(match);
}catch(error){
  res.status(401).json({error:"Internal Server Error!"});
}
}

export const getAllEvents=async(req,res)=>{

  try{
    const match = await Match.find();
    if (!match){
      return res.json("")
    }
    res.status(201).json(match);
  }catch(error){
    res.status(401).json({error:"Internal Server Error!"});
  }
  }

