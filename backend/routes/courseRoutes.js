import express from "express";
const router = express.Router();
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import wrapAsync from "../utils/wrapAsync.js";
import validateCourse from "../middleware/validateCourse.js";
import uploadImages from "../config/uploadImages.js";
import { createCourse, deleteCourse, getAllCourses, getCourse, updateCourse } from "../controllers/courseController.js";


router.get("/courses", wrapAsync(getAllCourses));

router.post("/courses/new", authMiddleware, adminMiddleware, uploadImages.single("thumbnail"), validateCourse, wrapAsync(createCourse));

router.get("/courses/:id", wrapAsync(getCourse));

router.put("/courses/:id", authMiddleware, adminMiddleware, uploadImages.single("thumbnail"), validateCourse, wrapAsync(updateCourse));

router.delete("/courses/:id", authMiddleware, adminMiddleware, wrapAsync(deleteCourse))



export default router;