import mongoose from "mongoose";
import Player from "../db/models/playerModel.js";
import friendShip from "../db/models/friendRelationModel.js";

export const getUsers = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const users = await Player.find({
      username: { $regex: new RegExp(searchQuery, "i") },
    });
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

async function getUserId(username) {
  try {
    const player = await Player.findOne({ username: username });
    return player ? player._id : null;
  } catch (error) {
    console.error(error);
  }
}

export const getProfile = async (req, res) => {
  try {
    const username = req.query.id;
    const user = await Player.findOne({ username: username }).populate('friendList');
    const responseData = {
      profileData: {
        _id: user._id,
        trustFactor: user.trustFactor,
        country:user.country,
        profilePic:user.profilePicture,
        coverPic:user.coverPicture,
        username:user.username,
        availability: user.availability,
        friendsList:user.friendList,
        record: user.record,
        
      },
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
/*The block with curly braces {} creates a block of code without an implicit return statement. 
Therefore, the arrow function doesn't return a value, and the filter function interprets this as a filtering criterion that is never met. 
As a result, it effectively filters out all elements from the array, leaving you with an empty array.
To fix this issue, you should either use an explicit return statement within the arrow function's block or remove the curly braces to make it an implicit return statement. Here's how you can do it:
Option 1: Using an explicit return statement:
const loggedinList = user.friendsList.filter((username) => {
  return username !== friendToRemove;
});
or do same as done below : */
export const removeFriend = async (req, res) => {
  try {
    const [friendToRemove, loggedInUsername] = await Promise.all([
      getUserId(req.query.friendToRemove),
      getUserId(req.query.loggedInUsername),
    ]);
    const friendship = await friendShip.findOneAndDelete({
      $or: [
        { sender: friendToRemove, recipient: loggedInUsername },
        { sender: loggedInUsername, recipient: friendToRemove },
      ],
    });

    if (friendship) {
      return res.status(200).json("Success");
    } else {
      return res.status(501).json("Failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error " }, error);
  }
};

export const sendInviteFriend = async (req, res) => {
  try {
    const { loggedinUsername, friendToAdd } = req.body;
    const [user, friend] = await Promise.all([
      Player.findOne({ username: loggedinUsername }),
      Player.findOne({ username: friendToAdd })
    ]
    );

    const friendRelation = await friendShip.find({
      $or: [{ sender: user._id,recipient: user._id },
       { sender: friend._id,recipient: friend._id }],
    });
    const friends = await friendShip.find();
    console.log("friends ", friends);
    console.log();
    console.log(friendRelation);
    if (friendRelation.length !== 0) {
      return res.status(201).json("Already Friends");
    }
    const newFriendShip = new friendShip({
      sender: user._id,
      recipient: friend._id,
      pendingStatus: true,
    });
    try {
      await newFriendShip.save();
      console.log(await friendShip.find());
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json("Friend Added");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }  
};  

export const acceptInvite = async (req, res) => {
  try {
    const friendAId = await getUserId(req.body.friend1);
    const friendBId = await getUserId(req.body.friend2);

    const updatedFriendship = await friendShip.findOneAndUpdate(
      { recipient: friendBId, sender: friendAId, status: 'pending' },
      { $set: { status: 'accepted' } },
      { new: true }
    );

    if (!updatedFriendship) {
      return res.status(404).json({ message: "Friendship not found or already accepted." });
    }

    await Player.findByIdAndUpdate(friendAId, { $addToSet: { friendsList: friendBId } });
    await Player.findByIdAndUpdate(friendBId, { $addToSet: { friendsList: friendAId } });

    return res.status(200).json({ message: "Friendship accepted and updated successfully." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const declineInvite = async (req, res) => {
  try {
    const friendA = await getUserId(req.query.friend1);
    const friendB = await getUserId(req.query.friend2);

    const updatedFriendship = await friendShip.findOneAndDelete(
      { recipient: friendB, sender: friendA ,status:'pending'},
      { new: true } 
    );
    if (updatedFriendship) {
      return res
        .status(201)
        .json({ message: "friendship Removed", updatedFriendship });
    } else {
      return res.status(500).json({ message: "Friendship not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};


export const getFriendsList = async (req, res) => {
  try {
    const loggedInUsername = req.query.username;

    // Find the user and populate their friendsList
    const user = await Player.findOne({ username: loggedInUsername }).populate('friendList', 'username'); // Customize fields as needed

    if (user && user.friendList.length > 0) {
      return res.status(200).json(user.friendList); 
    } else {
      return res.status(200).json([]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

export const getPlayerGamesById=async(req,res)=>{
  const playerId=req.query.id
  console.log(req.query)
  try{
  const player=await Player.findOne({_id:playerId}).populate('matchJoined')
  if (player)
    return res.status(201).json(player.matchJoined)
  return res.status(201).json('player id not found');  
  }catch(e){
    console.log(e);
    res.status(500).json({e});
  }

}