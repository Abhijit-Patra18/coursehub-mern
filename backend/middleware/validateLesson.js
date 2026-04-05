import { lessonSchema } from "../utils/validationSchemas.js";

const validateLesson = (req, res, next) => {
    const { error } = lessonSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    next();
}

export default validateLesson;