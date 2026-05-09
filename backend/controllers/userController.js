import User from "../models/User.js";
import AppError from "../utils/error.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const register = async (req, res) => {
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
    const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.json({
        message: "Registered & Logged in successfully",
        token,
        user: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    });
};

export const login = async (req, res) => {
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
};