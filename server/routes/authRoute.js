import express from "express"
import { register, login, verifyEmail, updateProfile } from "../controllers/authentication.js"

const router = express.Router()
router.post("/signup", register)
router.post("/signin", login)
router.get("/verify-email/:token", verifyEmail)
router.patch('/update-profile',updateProfile)
export default router
