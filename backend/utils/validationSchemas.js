import Joi from "joi";

export const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  thumbnail: Joi.string().uri().optional(),

});

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required()
});

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});


export const lessonSchema = Joi.object({
  id: Joi.string().required(),
  lessons: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      url: Joi.string().uri().required()
    })
  )
});