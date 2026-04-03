import express from "express";
import Purchase from "../models/Purchase.js";
import authMiddleware from "../middleware/authMiddleware.js";
import wrapAsync from "../utils/wrapAsync.js";
import AppError from "../utils/error.js";

const router = express.Router();

router.post("/purchase", authMiddleware, wrapAsync(async (req, res) => {
    const { courseId } = req.body;

    const existingPurchase = await Purchase.findOne({ user: req.user.id, course: courseId });
    if (existingPurchase) {
        throw new AppError("You already purchased this course");
    }


    const purchase = new Purchase({
        user: req.user.id,
        course: courseId
    })
    await purchase.save();
    res.json({
        message: "Course purchased successfully"
    });
}));

router.get("/mycourses", authMiddleware, wrapAsync(async (req, res) => {
    const myCourses = await Purchase.find({ user: req.user.id }).populate("course");
    if (myCourses.length === 0) {
        throw new AppError("You don't have any purchased course");
    }
    res.json(myCourses);
}))
export default router;

