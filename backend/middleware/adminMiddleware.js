import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
        return res.status(403).json({
            message: "Only Admin can access"
        });
    }
    next();
};
export default adminMiddleware;