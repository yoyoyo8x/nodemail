import Joi from "joi";

export const ContactValid = Joi.object({
  name: Joi.string()
    .required()
    .max(255)
    .required()
    .messages({ "string.empty": "Name is required" }),
  message: Joi.string()
    .required()
    .min(6)
    .max(255)
    .messages({ "string.empty": "Message is required" }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.regrex": "Invalid phone number" }),
  email: Joi.string().email().required().messages({
    "string.empty": "Display name cannot be empty",
    "string.email": "Invalid email",
  }),
  budget: Joi.number()
    .min(3)
    .required()
    .messages({ "number.empty": "Budget is required" }),
});
