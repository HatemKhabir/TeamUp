import express from "express"
import { login, register as signup, updateProfile } from "../controllers/authentication.js"
import { protect } from "../middleware/authMiddelware.js";

const router = express.Router()
router.post("/signup", signup)
router.post("/signin", login)
router.put('/update',protect,updateProfile)

//! router.get

export default router
