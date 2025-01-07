import express from "express";
import {createEvent,joinEvent,deleteEvent,getEvents, getAllEvents, leaveEvent, getEventDetailById, updateGameDetails, joinPrivateGame} from "../controllers/eventsController.js"
import { protect } from "../middleware/authMiddelware.js";
const router=express.Router();

  router.post("/create-event",protect, createEvent);
  router.post("/join-event",protect,joinEvent);
  router.post("/leave-event",protect,leaveEvent);
  router.delete("/create-event",protect,deleteEvent);
  router.get("/personal-event",protect,getEvents);
  router.get("/",getAllEvents);
  router.get("/game-lobby",protect,getEventDetailById);
  router.patch('/post-winners',protect,updateGameDetails);
  router.post('/join-private',protect,joinPrivateGame);
  
  export default router;
  

  