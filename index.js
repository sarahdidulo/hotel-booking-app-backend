import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';

import mainRouter from "./src/routes/index.js";

const app = express();

const PORT = 4000;

try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
    app.listen(4000, function () {
        console.log(`Listening on PORT:${PORT}`);
    });
} catch (err) {
    console.log(err);
    console.log("Connection failed");
}

// Enable CORS for the client origin
//changed - app.use(cors({ origin: "http://localhost:5173"}));
// origin: "http://127.0.0.1:5173"
// Use express.json() middleware to parse JSON request bodies
// app.use(cookieParser());

app.use(express.json());
app.use(cors({ credentials: true , origin: `https://hotel-booking-app-frontend-rho.vercel.app`}));
app.use('/be-hotel-booking/', mainRouter);

