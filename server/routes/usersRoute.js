import express from "express"
import { getProfile, getUsers, removeFriend,getFriendsList,getPlayerGamesById, acceptInvite, declineInvite, sendInviteFriend} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddelware.js";

const router=express.Router();

router.get("/search-player",protect,getUsers)
router.get("/games",protect,getPlayerGamesById)
router.get("/profile",getProfile)
router.post("/addFriend",protect,sendInviteFriend)
router.delete("/removeFriend",protect,removeFriend)
router.get("/friendsList",protect,getFriendsList);
router.patch("/addFriend",protect,acceptInvite)
router.delete("/addFriend",protect,declineInvite)
export default router
