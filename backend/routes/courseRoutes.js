import express from "express";
import Course from "../models/Course.js";
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
router.post("/courses", authMiddleware, adminMiddleware, validateCourse, wrapAsync(async (req, res) => {
    const courseData = req.body;
    const newCourse = new Course({
        ...courseData
    })
    await newCourse.save();
    res.status(201).json({
        message: "Course saved successfully"
    });

}))
router.get("/courses/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid ID", 400);
    }
    const findCourse = await Course.findById(id);
    if (!findCourse) {
        throw new AppError("Course not found", 404);
    }
    res.json(findCourse);
}))
router.put("/courses/:id", authMiddleware, adminMiddleware, validateCourse, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updateValue = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid ID", 400);
    }
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid ID", 400);
    }
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
        return res.json({ message: "Data not found" });
    }
    res.json({
        message: "Course deleted"
    });

}))

export default router;