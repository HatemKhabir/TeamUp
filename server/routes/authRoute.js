import express from "express"
import { register, login, verifyEmail } from "../controllers/authentication.js"

const router = express.Router()
router.post("/signup", register)
router.post("/signin", login)
router.get("/verify-email/:token", verifyEmail)

export default router
