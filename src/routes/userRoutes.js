import express from "express";
import { userDetails, addProfileDetails, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/user-details/:id", userDetails);
router.post("/add-profile-details/", addProfileDetails);
router.post("/update-profile/:id", updateProfile);
export default router;