import express from "express"
import { sendMessage,getMessages, getPrivateMessage, getLastMessage, getLobbyChat } from "../controllers/messagingController.js";
import { protect } from "../middleware/authMiddelware.js";

const router=express.Router()

router.post("/",protect,sendMessage);
router.get("/",protect,getMessages);
router.get("/private-messages",protect,getPrivateMessage)
router.get("/lastMessage",protect,getLastMessage)
router.get('/lobby-chat',protect,getLobbyChat)

export default router;