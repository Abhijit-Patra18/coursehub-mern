import User from "../models/User.js";
import AppError from "../utils/error.js";

const adminMiddleware = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
        throw new AppError("You can't access this", 403);

    }
    next();
};
export default adminMiddleware;