import express from "express";
import Course from "../models/Course.js";
const router = express.Router();

router.get("/courses", async (req, res) => {
    const data = await Course.find({});
    res.json(data);
})
router.post("/courses", async (req, res) => {
    const courseData = req.body;
    const newCourse = new Course({
        ...courseData
    })
    await newCourse.save();
    res.status(201).json({
        message: "Course saved successfully"
    });

})
router.get("/courses/:id", async(req, res) => {
    const { id } = req.params;
    const findCourse = await Course.findById(id);
    if (!findCourse) {
        return res.json({message: "Data not found"});
    }
    res.json(findCourse);
})
router.put("/courses/:id", async (req, res) => {
    const { id } = req.params;
    const updateValue = req.body;
    const findData = await Course.findById(id);
    if (!findData) {
        return res.json({ message: "Data not found" });
    }
    await Course.findByIdAndUpdate(id, updateValue);
    res.json({
        message: "Course updated successfully"
    });
})
router.delete("/courses/:id", async(req, res) => {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
        return res.json({ message: "Data not found" });
    }
    res.json({
        message: "Course deleted"
    });

})

export default router;