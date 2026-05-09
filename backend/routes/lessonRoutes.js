import express from 'express';
const router = express.Router();
import wrapAsynce from '../utils/wrapAsync.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateLessons from '../middleware/validateLessons.js';
import validateLesson from '../middleware/validateLesson.js';
import uploadVideos from '../config/uploadVideos.js';
import fixTitles from '../middleware/fixTitles.js';
import { addLesson, deleteLesson, getAllLesson, getEditLesson, updateLesson } from '../controllers/lessonController.js';



router.get("/lessons/edit/:id", authMiddleware, adminMiddleware, wrapAsynce(getEditLesson));

router.post("/lessons/add", authMiddleware, adminMiddleware, uploadVideos.array("videos"), fixTitles, validateLessons, wrapAsynce(addLesson));

router.get("/lessons/:id", authMiddleware, wrapAsynce(getAllLesson));

router.put("/lessons/:id", authMiddleware, adminMiddleware, uploadVideos.single("video"), validateLesson, wrapAsynce(updateLesson));

router.delete("/lessons/:id", authMiddleware, adminMiddleware, wrapAsynce(deleteLesson));


export default router;