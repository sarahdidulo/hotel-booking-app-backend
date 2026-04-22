import express from "express";
import { createBooking, findBookings, bookingList } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create-booking", createBooking);
router.get("/find-bookings/:roomId", findBookings);
router.get("/booking-list/:userId", bookingList);

export default router;