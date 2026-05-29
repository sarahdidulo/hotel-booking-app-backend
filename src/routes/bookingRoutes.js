import express from "express";
import { createBooking, findBookings, bookingList } from "../controllers/bookingController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/create-booking", verifyToken, createBooking);
router.get("/find-bookings/:roomId", verifyToken, findBookings);
router.get("/booking-list/:userId", verifyToken, bookingList);

export default router;