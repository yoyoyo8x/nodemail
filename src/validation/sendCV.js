import Joi from "joi";

export const categoryValid = Joi.object({
  name: Joi.string().required().min(6).max(255).required("Name is required"),
  message: Joi.string()
    .required()
    .min(6)
    .max(255)
    .message("Message is required"),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .message("Invalid phone number"),
  email: Joi.string()
    .email()
    .required("Email is required")
    .message("Invalid email"),
  budget: Joi.number().required("Budget is required"),
});
