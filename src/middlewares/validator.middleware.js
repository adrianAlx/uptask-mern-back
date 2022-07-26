'use strict';

import { body, validationResult } from 'express-validator';

import { isAlreadyRegistered } from '../helpers';
import { checkLoginCredentials } from './auth.middleware';

export const validate = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json(errors);

  return next();
};

// Auth
export const emailPassRules = () => [
  body('email', 'Invalid email!').isEmail(),
  body('password', 'Password must be longer than 6 characters!').isLength({
    min: 6,
  }),
];

export const signUpRules = () => [
  body('name', 'Invalid name!').notEmpty(),
  ...emailPassRules(),
  validate,

  body('email').custom(email => isAlreadyRegistered(email, 'user')),
  validate,
];

export const loginRules = () => [
  ...emailPassRules(),
  validate,
  checkLoginCredentials,
];

// Users
export const genRecoveryTokenRules = () => [
  body('email', 'Invalid email!').isEmail(),
  validate,
];
