import mongoose from "mongoose";
const {Schema, model} = mongoose;

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: false
    },
    middlename: {
        type: String,
        required: false
    },
    lastname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://img.freepik.com/premium-vector/blue-circle-with-white-user-vector_941526-5768.jpg?semt=ais_hybrid&w=740&q=80'
    }
})

const User = mongoose.models.user || model('User', user);
export default User;