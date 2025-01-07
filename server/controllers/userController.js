import mongoose from "mongoose";
import Player from "../db/models/playerModel.js";
import friendShip from "../db/models/friendRelationModel.js";
import Chat from "../db/models/chatModel.js";
import { getIO } from "../socket.js";


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
        bio:user.bio,
        createdAt:user.createdAt,
      },
    };
    const friendships = await friendShip.find({
      $or: [
        { sender: user._id},{recipient: user._id }
      ],
    });
    return res.status(201).json({responseData,friendships});
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

    // Find and delete the friendship
    const friendship = await friendShip.findOneAndDelete({
      $or: [
        { sender: friendToRemove, recipient: loggedInUsername },
        { sender: loggedInUsername, recipient: friendToRemove },
      ],
    });

    if (friendship) {
      await Promise.all([
        Player.findByIdAndUpdate(loggedInUsername, {
          $pull: { friendList: friendToRemove },
        }),
        Player.findByIdAndUpdate(friendToRemove, {
          $pull: { friendList: loggedInUsername },
        }),
      ]);

      return res.status(200).json("Success");
    } else {
      return res.status(501).json("Failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" }, error);
  }
};


export const sendInviteFriend = async (req, res) => {
  try {
    const { loggedinUsername, friendToAdd } = req.body;
    const [user, friend] = await Promise.all([
      Player.findOne({ username: loggedinUsername }),
      Player.findOne({ username: friendToAdd })
    ]);


    if (!user || !friend) {
      return res.status(404).json("User not found");
    }

    const friendRelation = await friendShip.find({
      $or: [
        { sender: user._id, recipient: friend._id },
        { sender: friend._id, recipient: user._id }
      ],
    });

    if (friendRelation.length !== 0) {
      return res.status(201).json("Already Friends");
    }

    const newFriendShip = new friendShip({
      sender: user._id,
      recipient: friend._id,
      status: "pending",
    });

    await newFriendShip.save();
    
    // Populate the sender information before emitting
    const populatedFriendship = await friendShip.findById(newFriendShip._id)
      .populate('sender', 'username profilePicture');
    
    // Get socket instance and emit to specific room
    const io = getIO();
    console.log('Emitting to room:', friend._id.toString());
    io.to(friend._id.toString()).emit('newFriendRequest', populatedFriendship);

    return res.status(201).json("Friend request sent");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptInvite = async (req, res) => {
  try {
    const { inviteId } = req.body;

    const updatedFriendship = await friendShip.findOneAndUpdate(
      { _id: inviteId, status: 'pending' },
      { $set: { status: 'accepted' } },
      { new: true }
    );

    if (!updatedFriendship) {
      return res.status(404).json({ message: "Friendship not found or already accepted." });
    }

    const friendAId = updatedFriendship.recipient;
    const friendBId = updatedFriendship.sender;

 

    // No need to use `new ObjectId()`, as they are already ObjectId instances
    await Player.findByIdAndUpdate(
      friendAId,
      { $addToSet: { friendList: friendBId } },
      { new: true } // Return updated document for debugging
    );

    await Player.findByIdAndUpdate(
      friendBId,
      { $addToSet: { friendList: friendAId } },
      { new: true }
    );

    const newChat=new Chat({
      isGroupChat:false,
      users:[friendAId,friendBId],
    })
    await newChat.save()
    updatedFriendship.chat=newChat._id;
    await updatedFriendship.save()

    return res.status(200).json({ message: "Friendship accepted and updated successfully." });
  } catch (error) {
    console.error('Error in acceptInvite:', error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};


export const declineInvite = async (req, res) => {
  try {
    const { inviteId } = req.query;

    const updatedFriendship = await friendShip.findOneAndDelete(
      { _id:inviteId, status: 'pending' },
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
    const user = await Player.findOne({ username: loggedInUsername }).populate('friendList', 'username profilePicture'); // Customize fields as needed

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

export const checkFriendStatus = async (req, res) => {
  try {
    const { loggedinUsername, friendToAdd } = req.query;

    const sender = await Player.findOne({ username: loggedinUsername });
    const recipient = await Player.findOne({ username: friendToAdd });

    if (!sender || !recipient) {
      return res.status(404).json({ message: 'One or both users not found.' });
    }

    const friendships = await friendShip.findOne({
      $or: [
        { sender: sender._id, recipient: recipient._id },
        { sender: recipient._id, recipient: sender._id },
      ],
    });

    if (!friendships) {
      return res.status(200).json({ status: 'none' }); // No friendship exists
    }

    return res.status(200).json(friendships);
  } catch (error) {
    console.error('Error checking friendship status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Increment trust factor (commend)
export const commendPlayer = async (req, res) => {
  const { username, commenderId } = req.params;

  try {
    const player = await Player.findOne({ username });
    if (!player) {
      return res.status(404).json({ message: 'Player not found.' });
    }

    // Check if commenderId already exists in commendReportLog for "commend"
    const existingLog = player.commendReportLog.find(
      (log) => log.userId === commenderId && log.action === 'commend'
    );

    if (existingLog) {
      return res.status(400).json({ message: 'You have already commended this player.' });
    }

    // Increment trust factor and add to commendReportLog
    player.trustFactor += 10;
    player.commendReportLog.push({ userId: commenderId, action: 'commend' });
    await player.save();

    return res.status(200).json({
      message: 'Player commended successfully!',
      trustFactor: player.trustFactor,
    });
  } catch (error) {
    console.error('Error commending player:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

// Decrement trust factor (report)
export const reportPlayer = async (req, res) => {
  const { username, commenderId } = req.params;

  try {
    const player = await Player.findOne({ username });
    if (!player) {
      return res.status(404).json({ message: 'Player not found.' });
    }

    const existingLog = player.commendReportLog.find(
      (log) => log.userId === commenderId && log.action === 'report'
    );

    if (existingLog) {
      return res.status(400).json({ message: 'You have already reported this player.' });
    }

    // Decrement trust factor and add to commendReportLog
    player.trustFactor -= 5;
    player.commendReportLog.push({ userId: commenderId, action: 'report' });
    await player.save();

    return res.status(200).json({
      message: 'Player reported successfully!',
      trustFactor: player.trustFactor,
    });
  } catch (error) {
    console.error('Error reporting player:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getPendingInvites = async (req, res) => {
  try {
    const userId = req.user.id;
    
    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "User not authenticated" 
      });
    }

    const pendingInvites = await friendShip.find({
      recipient: userId,
      status: "pending"
    }).populate('sender', 'username profilePicture');

    return res.status(200).json({
      success: true,
      data: pendingInvites
    });

  } catch (error) {
    console.error('Error fetching pending invites:', error);
    return res.status(500).json({
      success: false,
      message: "Error fetching pending invites",
      error: error.message
    });
  }
};
  
