import Lesson from "../models/Lesson.js";
import Purchase from "../models/Purchase.js";
import AppError from "../utils/error.js";
import Course from "../models/Course.js";
import User from "../models/User.js";


export const getAllLesson = async (req, res) => {
    const { id } = req.params;

    const existingPurchase = await Purchase.findOne({ user: req.user.id, course: id });
    const curruser = await User.findById(req.user.id);
    
    if (!existingPurchase && curruser.role !== "admin") {
        throw new AppError("You have not purchased this course", 403);
    }

    const findLesson = await Lesson.find({ course: id }).populate("course");
    if (findLesson.length === 0) {
        throw new AppError("No lessons found in this course", 404);
    }
    res.json(findLesson);
};

export const getEditLesson = async (req, res) => {
    const { id } = req.params;
    const findLesson = await Lesson.findById(id);
    if (!findLesson) {
        throw new AppError("Lessons not found", 404);
    }
    res.json(findLesson);
};

export const addLesson = async (req, res) => {
    const { courseId, titles } = req.body;
    const files = req.files;

    const findCourse = await Course.findById(courseId);
    if (!findCourse) {
        return res.status(400).json({ message: "Course not found" });
    }

    const lessons = titles.map((title, index) => ({
        title: title,
        url: files[index].path,
        course: courseId
    }));
    await Lesson.insertMany(lessons);
    res.status(201).json({
        message: "Lessons saved successfully"
    });

};

export const updateLesson = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const url = req.file ? req.file.path : undefined;

    const findLesson = await Lesson.findById(id);

    if (!findLesson) {
        throw new AppError("Lessons not found", 404);
    }

    await Lesson.findByIdAndUpdate(id, {
        title,
        ...(url && { url })
    });
    res.json({
        message: "Lesson updated successfully"
    });
};

export const deleteLesson = async (req, res) => {
    const { id } = req.params;
    const findLesson = await Lesson.findById(id);

    if (!findLesson) {
        throw new AppError("Lessons not found", 404);
    }

    await Lesson.findByIdAndDelete(id);
    res.json({
        message: "Lesson Delete successfully"
    });

};