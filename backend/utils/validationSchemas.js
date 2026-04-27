import Joi from "joi";

export const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required()
}).unknown(true);

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});


export const lessonsSchema = Joi.object({
  courseId: Joi.string().required(),
  
  titles: Joi.array().items(
    Joi.string().required()
  ).min(1).required()
}).unknown(true);


export const lessonSchema = Joi.object({
  title: Joi.string().required(),
});


export const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  message: Joi.string().required()
});