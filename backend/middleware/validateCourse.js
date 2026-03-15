import { courseSchema } from "../utils/validationSchemas.js";

const validateCourse = (req, res, next) => {
    const { error } = courseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
};
export default validateCourse;