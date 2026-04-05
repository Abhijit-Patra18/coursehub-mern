import express from 'express';
import Lesson from '../models/Lesson.js';
import wrapAsynce from '../utils/wrapAsync.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateLesson from '../middleware/validateLesson.js';
const router = express.Router();


router.get("/lessons/:id", async (req, res) => {
    const { id } = req.params;
    const findLesson = await Lesson.find({ course: id });
 
    if (!findLesson) {
        throw new AppError("Lessons not found", 404);
    }
    res.json(findLesson);
})


router.post("/lessons/add", authMiddleware, adminMiddleware, validateLesson, wrapAsynce(async (req, res) => {
    const { id, lessons } = req.body;

    const newLessons = new Lesson({
        lessons,
        course: id
    });

    await newLessons.save();
    res.status(201).json({
        message: "Lessons saved successfully"
    });

}));

export default router;