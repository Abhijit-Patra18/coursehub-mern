import { lessonsSchema } from "../utils/validationSchemas.js";

const validateLessons = (req, res, next) => {
    const { error } = lessonsSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
}

export default validateLessons;