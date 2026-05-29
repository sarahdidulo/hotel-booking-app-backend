import express from "express";
import { userDetails, addProfileDetails, updateProfile } from "../controllers/userController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/user-details/:id", verifyToken, userDetails);
router.post("/add-profile-details/", verifyToken, addProfileDetails);
router.post("/update-profile/:id", verifyToken, updateProfile);
export default router;