import express from "express";
const router = express.Router();
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import wrapAsync from "../utils/wrapAsync.js";

router.post("/register", wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });
    await newUser.save();
    res.json({
        message: "User registered successfully"
    });
}));

router.post("/login", wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "User not found" })
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.json({ message: "Wrong password" });
    }
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.json({
        message: "Login successful",
        token
    });
}));

export default router;