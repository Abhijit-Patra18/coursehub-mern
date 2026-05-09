import Purchase from "../models/Purchase.js";
import AppError from "../utils/error.js";


export const getMyCourse = async (req, res) => {
    const myCourses = await Purchase.find({ user: req.user.id }).populate("course");
    if (myCourses.length === 0) {
        throw new AppError("You don't have any purchased course", 404);
    }
    res.json(myCourses);
};

export const getPurchaseAll = async (req, res) => {
    const allPurchase = await Purchase.find({}).populate("course").populate("user");
    if (allPurchase.length === 0) {
        throw new AppError("No one can't purchased any course!", 404);
    }
    res.json(allPurchase);
};

export const newPurchaseCourse = async (req, res) => {
    const { courseId } = req.body;

    const existingPurchase = await Purchase.findOne({ user: req.user.id, course: courseId });
    if (existingPurchase) {
        throw new AppError("You already purchased this course", 400);
    }
    const purchase = new Purchase({
        user: req.user.id,
        course: courseId
    })
    await purchase.save();
    res.json({
        message: "Course purchased successfully"
    });
};