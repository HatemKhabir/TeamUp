import express from "express";
import {createEvent,joinEvent,deleteEvent,getEvents, getAllEvents, leaveEvent} from "../controllers/eventsController.js"
import { protect } from "../middleware/authMiddelware.js";
const router=express.Router();



  router.post("/create-event",protect, createEvent);
  router.post("/join-event",protect,joinEvent);
  router.post("/leave-event",protect,leaveEvent);
  router.delete("/create-event",protect,deleteEvent);
  router.get("/create-event",protect,getEvents);
  router.get("/",getAllEvents);

  export default router;
  