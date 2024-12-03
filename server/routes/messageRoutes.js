import express from "express"
import { sendMessage,getMessages, getPrivateMessage } from "../controllers/messagingController.js";
import { protect } from "../middleware/authMiddelware.js";

const router=express.Router()

router.post("/",protect,sendMessage);
router.get("/",protect,getMessages);
router.get("/private-messages",protect,getPrivateMessage)


export default router;