import mongoose from "mongoose";
const {Schema, model} = mongoose;

const room = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    numberOfPersons: {
        type: Number,
        required: true,
    },
    imageLink: {
        type: String,
        required: false
    }
})

const Room = mongoose.models.user || model('Room', room);
export default Room;