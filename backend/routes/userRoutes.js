import express from "express";
const router = express.Router();
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import wrapAsync from "../utils/wrapAsync.js";
import validateUser from "../middleware/validateUser.js";
import validateLogin from "../middleware/validateLogin.js";
import AppError from "../utils/error.js";


router.post("/register", validateUser, wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email already registered", 401);
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

router.post("/login", validateLogin, wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("User not found !", 404);

    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new AppError("Wrong Password", 401);

    }
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.json({
        message: "Login successful",
        token,
        user: {
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}));

export default router;