import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import wrapAsync from "../utils/wrapAsync.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { getMyCourse, getPurchaseAll, newPurchaseCourse } from "../controllers/purchaseController.js";


router.get("/mycourses", authMiddleware, wrapAsync(getMyCourse));

router.get("/purchase/all", authMiddleware, adminMiddleware, wrapAsync(getPurchaseAll));

router.post("/purchase", authMiddleware, wrapAsync(newPurchaseCourse));


export default router;

