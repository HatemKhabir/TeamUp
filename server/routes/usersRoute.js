import express from "express"
import { getProfile, getUsers, removeFriend,getFriendsList,getPlayerGamesById, acceptInvite, declineInvite, sendInviteFriend, checkFriendStatus, commendPlayer, reportPlayer, getPendingInvites} from "../controllers/userController.js"
import { protect } from "../middleware/authMiddelware.js";
import { verifyEmail } from "../controllers/authentication.js";

const router=express.Router();

router.get("/search-player",getUsers)
router.get("/games",protect,getPlayerGamesById)
router.get("/profile",getProfile)
router.post("/addFriend",protect,sendInviteFriend)
router.get('/friendStatus',protect,checkFriendStatus)
router.delete("/removeFriend",protect,removeFriend)
router.get("/friendsList",protect,getFriendsList);
router.patch("/addFriend",protect,acceptInvite)
router.delete("/addFriend",protect,declineInvite)
router.patch('/commend/:username', commendPlayer);
router.patch('/report/:username', reportPlayer);
router.get("/pending-invites",protect,getPendingInvites);

export default router
