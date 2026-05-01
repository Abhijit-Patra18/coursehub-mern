import express from "express";
import Course from "../models/Course.js";
import Purchase from "../models/Purchase.js";
import Lesson from "../models/Lesson.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import wrapAsync from "../utils/wrapAsync.js";
import validateCourse from "../middleware/validateCourse.js";
import AppError from "../utils/error.js";
const router = express.Router();
import uploadImages from "../config/uploadImages.js";



router.get("/courses", wrapAsync(async (req, res) => {
    const data = await Course.find({});
    res.json(data);
}));


router.post("/courses/new", authMiddleware, adminMiddleware, uploadImages.single("thumbnail"), validateCourse, wrapAsync(async (req, res) => {

    const { title, description, price } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Thumbnail is required" });
    }

    const thumbnail = req.file.path;

    await Course.create({
        title,
        description,
        price,
        thumbnail
    });

    res.status(201).json({
        message: "Course created successfully"
    });

}));


router.get("/courses/:id", authMiddleware, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const findCourse = await Course.findById(id);
    if (!findCourse) {
        throw new AppError("Course not found", 404);
    }
    res.json(findCourse);
}))


router.put("/courses/:id", authMiddleware, adminMiddleware, uploadImages.single("thumbnail"), validateCourse, wrapAsync(async (req, res) => {
    const { id } = req.params;
        const { title, description, price } = req.body;
        const thumbnail = req.file ? req.file.path : undefined;

    const findData = await Course.findById(id);
    if (!findData) {
        throw new AppError("Data not found", 404);
    }
    await Course.findByIdAndUpdate(id, {
        title,
        description,
        price,
        ...(thumbnail && { thumbnail })
    });
    res.json({
        message: "Course updated successfully"
    });
}));


router.delete("/courses/:id", authMiddleware, adminMiddleware, wrapAsync(async (req, res) => {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
        throw new AppError("Course not found", 404);
    }
    await Purchase.deleteMany({ course: id });
    await Lesson.deleteMany({ course: id });
    res.json({
        message: "Course and related purchases, lessons deleted"
    });

}))

export default router;