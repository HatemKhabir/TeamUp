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
    privacy: req.body.privacy,
    gamePicCover:req.body.gamePicCover!=null?req.body.gamePicCover:'https://img.freepik.com/premium-photo/sports-background-advertising-sport-life-concept-generative-ai_1002555-984.jpg'
  };
  
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
  const matchID = req.body.gameId
  const userId=req.body.userId
  try {
    const match = await Match.findOne({ _id:matchID })
    const user=await Player.findOne({_id:userId})
    if (!match) {
      return res.status(202).json("Match Not Found !")
    }
    if (user.matchJoined.includes(matchID)){
  
    return res.status(201).json("You already Joined this Game ! ")
    }
    if (match.playersList.length==match.playersNumber){
    return res.status(201).json("Match is already full ! ")}
    match.playersList.push(userId)
    user.matchJoined.push(matchID);
    await user.save();
    await match.save();
    
    res.status(200).json({message:"Match Joined !",match,user})
  } catch (error) {
    console.error(error)
    res.status(403).json("An error occurred")
  }
}

export const leaveEvent = async (req, res) => {
  const matchID = req.body.gameId;
  const userId = req.body.userId;

  try {
    const match = await Match.findOne({ _id:matchID });
    const user = await Player.findOne({ _id: userId });
    if (!match) {
      return res.status(200).json("Match Not Found!");
    }

    // Check if the user is not in the match
    if (!user.matchJoined.includes(matchID)) {
      return res.status(200).json("You haven't joined this Game!");
    }

    match.playersList = match.playersList.filter(id => id.toString() != user._id);
    user.matchJoined = user.matchJoined.filter(id => id.toString() != match._id);
 
    await user.save();
    await match.save();

    res.status(200).json({message:"Left the Match successfully!",match,user});
  } catch (error) {
    console.error(error);
    res.status(403).json("An error occurred");
  }
};


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

export const getEvents = async (req, res) => {
  const username = req.query.user;

  try {
    const player = await Player.findOne({ username }); 
    if (!player) {
      return res.status(404).json({ error: "Player not found!" });
    }

    const joinedMatches = await Match.find({ _id: { $in: player.matchJoined } });

    const hostedMatches = await Match.find({ hostUsername: username });

    const allMatches = [...joinedMatches, ...hostedMatches];
    const uniqueMatches = Array.from(new Set(allMatches.map(match => match._id))).map(
      id => allMatches.find(match => match._id.toString() === id.toString())
    );

    res.status(200).json({ matches: uniqueMatches });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};


export const getAllEvents=async(req,res)=>{
 const sportName=req.query?req.query.sportName:'';
 const query={
  privacy:'public',status:'upcoming',...(sportName&&{sportType:sportName})
 }
  try{
    const match = await Match.find(query);
    if (!match){
      return res.json("")
    }
    res.status(201).json(match);
  }catch(error){
    res.status(401).json({error:"Internal Server Error!"});
  }
  }

  export const getEventDetailById=async(req,res)=>{
    const gameId=req.query.gameId;

    try{
const match=await Match.findById(gameId).populate('playersList')
if(!match){
  return res.json("")
}
return res.status(201).json(match)
    }catch(error){
      res.status(401).json({error})
    }
  }

  export const updateGameDetails = async (req, res) => {
    try {
      const { gameId, selectedWinners, losers, loggedinUsername } = req.body;
  
      // Validate input data
      if (!gameId || !selectedWinners || !losers || !loggedinUsername) {
        return res.status(400).json("Incomplete or incorrect data provided.");
      }
  
      // Find the match
      const match = await Match.findById(gameId);
      if (!match) {
        return res.status(404).json("Match not found.");
      }
      
      // Check if the logged-in user is the host of the match
      if (match.hostUsername !== loggedinUsername) {
        return res.status(403).json("You are not authorized to update this match.");
      }
  
      const sportType = match.sportType.toLowerCase(); 
      const validSports = ["volleyball", "football", "basketball", "tabletennis", "tennis", "padel"];
      if (!validSports.includes(sportType)) {
        return res.status(400).json("Invalid sport type specified in the match.");
      }
      if(match.status=='finished'){
        return res.status(400).json("Match Finished Already ! ")
      }
      
      let updatedWinners = [];
      if (selectedWinners.length > 0) {
        const winnerPromises = selectedWinners.map((winnerId) =>
          Player.findByIdAndUpdate(
            winnerId,
            { $inc: { [`record.${sportType}.wins`]: 1 } },
            { new: true } 
          )
        );
        updatedWinners = await Promise.all(winnerPromises);
      }
  
      let updatedLosers = [];
      if (losers.length > 0) {
        const loserPromises = losers.map((loserId) =>
          Player.findByIdAndUpdate(
            loserId,
            { $inc: { [`record.${sportType}.losses`]: 1 } },
            { new: true } 
          )
        );
        updatedLosers = await Promise.all(loserPromises);
      }
      match.status='finished'
      match.winners=updatedWinners;
      match.losers=updatedLosers;
      await match.save();
      
      return res.status(200).json({
        message: "Match results updated successfully.",
        match,
        updatedWinners,
        updatedLosers,
      });
    } catch (error) {
      console.error("Error updating game details:", error);
      return res.status(500).json("An error occurred while updating game details.");
    }
  };
  