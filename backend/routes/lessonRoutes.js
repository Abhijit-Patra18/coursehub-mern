import express from 'express';
import Lesson from '../models/Lesson.js';
import Purchase from '../models/Purchase.js';
import wrapAsynce from '../utils/wrapAsync.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateLessons from '../middleware/validateLessons.js';
import validateLesson from '../middleware/validateLesson.js';
import AppError from '../utils/error.js';
const router = express.Router();


router.get("/lessons/:id", authMiddleware, wrapAsynce(async (req, res) => {
    const { id } = req.params;

    const existingPurchase = await Purchase.findOne({ user: req.user.id, course: id });
    if (!existingPurchase && req.user.role === "user") {
        throw new AppError("You have not purchased this course");
    }

    const findLesson = await Lesson.find({ course: id }).populate("course");
    if (findLesson.length === 0) {
        throw new AppError("No lessons found in this course", 404);
    }
    res.json(findLesson);
}));



router.get("/lessons/edit/:id", authMiddleware, adminMiddleware, wrapAsynce(async (req, res) => {
    const { id } = req.params;
    const findLesson = await Lesson.findById(id);
    if (!findLesson) {
        throw new AppError("Lessons not found", 404);
    }
    res.json(findLesson);
}));



router.post("/lessons/add", authMiddleware, adminMiddleware, validateLessons, wrapAsynce(async (req, res) => {
    const { id, lessons } = req.body;
    const lessonsToSave = lessons.map((lesson) => ({
        course: id,
        title: lesson.title,
        url: lesson.url,
    }));
    await Lesson.insertMany(lessonsToSave);
    res.status(201).json({
        message: "Lessons saved successfully"
    });

}));



router.put("/lessons/:id", authMiddleware, adminMiddleware, validateLesson, wrapAsynce(async (req, res) => {
    const { id } = req.params;
    const findLesson = await Lesson.findById(id);
    if (!findLesson) {
        throw new AppError("Lessons not found", 404);
    }
    await Lesson.findByIdAndUpdate(id, req.body);
    res.json({
        message: "Lesson update successfully"
    });
}));


router.delete("/lessons/:id", authMiddleware, adminMiddleware, wrapAsynce(async (req, res) => {
    const { id } = req.params;
    const findLesson = await Lesson.findById(id);

     if (!findLesson) {
        throw new AppError("Lessons not found", 404);
    }

    await Lesson.findByIdAndDelete(id);
    res.json({
        message: "Lesson Delete successfully"
    });
    
}));


export default router;