import express from "express";
import Contact from '../models/Contact.js';
import wrapAsynce from '../utils/wrapAsync.js';
import validateContact from "../middleware/validateContact.js";
import AppError from "../utils/error.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();



router.get("/admin/message", authMiddleware, adminMiddleware, wrapAsynce(async (req, res) => {
    const allMessage = await Contact.find().sort({ createdAt: -1 });
    res.json(allMessage);
}));

router.post("/contact", validateContact, wrapAsynce(async (req, res) => {
    const { name, email, message } = req.body;
    const newMessage = new Contact({
        name,
        email,
        message
    });
    await newMessage.save();

    res.json({
        message: "Message sent successfully"
    });
}));

router.put("/message/update/:id",authMiddleware, adminMiddleware, wrapAsynce(async (req, res) => {
    const { id } = req.params;
    const findMessage = await Contact.findById( id );

    if (!findMessage) {
        throw new AppError("Message not found", 404);
    }
    if (findMessage.status === "read") {
        throw new AppError("Message already marked", 200);
    }
    await Contact.findByIdAndUpdate(id,
        {
            status: "read"
        }
    )
     res.json({
        message: "Message mark as read"
    });
}))


export default router;