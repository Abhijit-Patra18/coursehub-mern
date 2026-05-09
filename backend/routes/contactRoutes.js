import express from "express";
const router = express.Router();
import wrapAsynce from '../utils/wrapAsync.js';
import validateContact from "../middleware/validateContact.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { getAllMessage, newMessage, updateMessage } from "../controllers/contactController.js";


router.get("/admin/message", authMiddleware, adminMiddleware, wrapAsynce(getAllMessage));

router.post("/contact", validateContact, wrapAsynce(newMessage));

router.put("/message/update/:id",authMiddleware, adminMiddleware, wrapAsynce(updateMessage))


export default router;