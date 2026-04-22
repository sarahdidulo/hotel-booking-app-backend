import express from "express";
import userRoutes from "./userRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import roomRoutes from "./roomRoutes.js";
import authRoutes from "./authRoutes.js";

const mainRouter = express.Router();

mainRouter.use('/auth/', authRoutes);
mainRouter.use('/user/', userRoutes);
mainRouter.use('/room/', roomRoutes);
mainRouter.use('/booking/', bookingRoutes);

export default mainRouter;