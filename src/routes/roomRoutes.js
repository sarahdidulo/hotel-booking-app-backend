import express from "express";
import { createRoom, allRooms, searchRoom, updateRoom, deleteRoom } from "./../controllers/roomController.js";
const router = express.Router();

router.post("/create-room", createRoom);
// router.post("/upload", upload.single('file'), uploadFile);
router.get("/all-rooms", allRooms);
router.get("/search-room/:id", searchRoom);
router.post("/update-room/:id", updateRoom);
router.delete("/delete-room/:id", deleteRoom);
export default router; 

// import multer from "multer";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const dir = path.join(__dirname,'../../');

// const __dirname = path.resolve();
// console.log(' __dirname : ',__dirname);
// const uploadFolder = path.join(__dirname, 'uploads');
// console.log('uploadFolder : ', uploadFolder);


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadFolder)
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   }
// })

// const upload = multer({ storage: storage })

