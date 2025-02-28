import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be no longer than 20 characters',
    'any.required': 'Name is required',
  }),

  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),

  phoneNumber: Joi.string()
    .pattern(/^\+\d{12}$/)
    .required()
    .messages({
      'string.base': 'Phone number must be a string',
      'string.pattern.base': 'Invalid phone number format',
      'any.required': 'Phone number is required',
    }),

  isFavourite: Joi.boolean(),

  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .messages({
      'any.only': 'Contact type must be one of "personal","home" or "work"',
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string()
    .pattern(/^\+\d{12}$/) // Формат +380000000000
    .messages({
      'any.required': 'Phone number is required',
      'string.empty': 'Phone number cannot be empty',
      'string.pattern.base': 'Phone number must be in the format +380000000000',
    }),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});