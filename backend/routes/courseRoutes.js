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

router.get("/courses", wrapAsync(async (req, res) => {
    const data = await Course.find({});
    res.json(data);
}))
router.post("/courses/new", authMiddleware, adminMiddleware, validateCourse, wrapAsync(async (req, res) => {
    const courseData = req.body;
    const newCourse = new Course({
        ...courseData
    })
    await newCourse.save();
    res.status(201).json({
        message: "Course saved successfully"
    });

}))
router.get("/courses/:id", authMiddleware, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const findCourse = await Course.findById(id);
    if (!findCourse) {
        throw new AppError("Course not found", 404);
    }
    res.json(findCourse);
}))
router.put("/courses/:id", authMiddleware, adminMiddleware, validateCourse, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updateValue = req.body;

    const findData = await Course.findById(id);
    if (!findData) {
        throw new AppError("Data not found", 404);
    }
    await Course.findByIdAndUpdate(id, updateValue);
    res.json({
        message: "Course updated successfully"
    });
}))
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