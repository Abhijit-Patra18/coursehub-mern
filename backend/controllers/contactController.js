import Contact from "../models/Contact.js";
import AppError from "../utils/error.js";


export const getAllMessage  = async (req, res) => {
    const allMessage = await Contact.find().sort({ createdAt: -1 });
    res.json(allMessage);
};

export const newMessage = async (req, res) => {
    const { name, email, message } = req.body;
    const newContact = new Contact({
        name,
        email,
        message
    });
    await newContact.save();

    res.json({
        message: "Message sent successfully"
    });
};

export const updateMessage = async (req, res) => {
    const { id } = req.params;
    const findMessage = await Contact.findById( id );

    if (!findMessage) {
        throw new AppError("Message not found", 404);
    }
    if (findMessage.status === "read") {
        throw new AppError("Message already marked", 400);
    }
    await Contact.findByIdAndUpdate(id,
        {
            status: "read"
        }
    )
     res.json({
        message: "Message mark as read"
    });
};