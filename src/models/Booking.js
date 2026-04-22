import mongoose from "mongoose";
const {Schema, model} = mongoose;

const booking = new Schema({
    //add timestamp
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    roomId: { 
        type: Schema.Types.ObjectId,
        ref: 'Room'
    },
    roomName: {
        type: String,
        required: true
    },
    roomImageLink: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number, /* price * number of days */
        required: true
    }
})

const Booking = mongoose.models.user || model('Booking', booking);
export default Booking;