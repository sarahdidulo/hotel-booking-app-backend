import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';

import mainRouter from "./src/routes/index.js";

const app = express();

const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ credentials: true , origin: `https://hotel-booking-app-frontend-rho.vercel.app`}));

try {
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    await mongoose.connect(`${process.env.MONGODB_URI}`, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    app.listen(4000, function () {
        console.log(`Listening on PORT:${PORT}`);
    });
} catch (err) {
    console.log(err);
    console.log("Connection failed");
}

// Enable CORS for the client origin
// app.use(cors({ credentials: true , origin: "http://localhost:5173"}))

// Use express.json() middleware to parse JSON request bodies
// app.use(cookieParser());

app.use('/be-hotel-booking/', mainRouter);

