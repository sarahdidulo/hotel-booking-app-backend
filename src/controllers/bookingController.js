import Booking from "../models/Booking.js";

export const createBooking = async(req, res, next) => {
    try {
        const booking = await Booking.create(req.body);
        await booking.save();
        res.json({success: true, booking_data: booking});
    } catch (err) { 
        res.status(400).send(`ERROR: ${err}`);
    }
}

export const findBookings = async(req, res, next) => {
    let id = req.params.roomId;
    try {
        const bookings = await Booking.find({roomId : id}).exec();
        res.json({success: true, data: bookings});
    } catch (err) {
        res.status(400).send(`ERROR: ${err}`);
    }
}

export const bookingList = async(req, res, next) => {
    let id = req.params.userId;
    try {
        const bookings = await Booking.find({userId : id}).exec();
        res.json({success: true, data: bookings});
        
    } catch (err) {
        res.status(400).send(`ERROR: ${err}`);
    }
}