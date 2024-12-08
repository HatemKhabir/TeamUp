import mongoose from "mongoose";
import Chat from "../db/models/chatModel.js";
import Message from "../db/models/messageModel.js"
import friendShip from "../db/models/friendRelationModel.js";

export const sendMessage=async(req,res)=>{
    const {chatId,messageContent,senderID}=req.body
    console.log(req.body)
    if (!chatId || !messageContent){
        return res.status(403).json({message:"Invalid Data Sent"})
    }
    try{
    console.log(messageContent)
    let newMessage={
        senderID:senderID,
        content:messageContent,
        chat:chatId
    }
    let message=await Message.create(newMessage)
    await Message.populate(message,[{path:"senderID",select :"username"},{path:"chat"}])
    const findChat=await Chat.findOneAndUpdate({_id:chatId},{latestMsg:message})
    await Chat.populate(findChat,{path:"latestMsg",select:"content"})
    console.log(message)
    if(message&&findChat)
    return res.status(201).json(newMessage);
    return res.status(403).json({message:"something wwong happend"})
    }catch(e){
        console.log(e)
        return res.status(503).json({message:e.message})
    }

}

export const getMessages = async (req, res) => {
    const { chatId } = req.query; 
    console.log(chatId);
  
    try {
      if (!chatId) {
        return res.status(400).json({ message: "chatId is required" });
      }
  
      const messages = await Message.find({ chat: chatId }).populate(
        "senderID",
        "username profilePicture" 
      );
  
      console.log(messages);
      return res.status(200).json(messages);
    } catch (e) {
      console.log(e);
      return res.status(503).json({ message: e.message });
    }
  };
  

export const getPrivateMessage = async (req, res) => {
    const { friendShipId } = req.query;
  
    try {
      if (!friendShipId) {
        return res.status(400).json({ message: "friendship id is unavailable" });
      }
  
      const friendship = await friendShip.findOne({
       _id:friendShipId,
       type:'accepted'
      });
       
      if (!friendship) {
        return res.status(404).json({ message: "No chat exists between the users." });
      }
      if (!friendship.chat) {
        return res.status(404).json({ message: "Chat not initialized for this friendship." });
      }
      const messages = await Message.find({ chat: friendship.chat }).populate(
        "senderID",
        "username profileImage"
      ); 
  
      return res.status(200).json(messages);
    } catch (e) {
      console.error("Error fetching private messages:", e);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
  