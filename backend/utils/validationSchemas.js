import Joi from "joi";

export const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  thumbnail: Joi.string().uri().optional(),

  lessons: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      videoUrl: Joi.string().uri().required()
    })
  )
});