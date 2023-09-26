import express from "express";
import { addBookings, getBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/bookings", addBookings);
router.get('/bookings', getBookings);

export default router;
