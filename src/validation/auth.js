import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be no longer than 30 characters',
    'any.required': 'Name is required',
  }),

  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),

  password: Joi.string()
    .min(6)
    .max(50)
    .trim()
    .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.empty': 'Password cannot be empty',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be no longer than 50 characters',
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one number, and one special character (!@#$%^&*)',
      'any.required': 'Password is required',
    }),

  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User ID should be a valid MongoDB ObjectId');
    }
    return true;
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().trim().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
});