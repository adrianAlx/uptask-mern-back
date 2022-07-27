'use strict';

import { body, validationResult, param } from 'express-validator';

import {
  idExistInDB,
  isAlreadyRegistered,
  isSameUserOrPartner,
} from '../helpers';
import { checkLoginCredentials, checkToken } from '.';

export const validate = (req, res, next) => {
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

export const genNewPasswordRules = () => [
  body('password', 'Password is required!').notEmpty(),
  validate,
  checkToken,
];

// Projects
export const createProjectRules = () => [
  body('name', 'Invalid name!').notEmpty(),
  body('description', 'Invalid description!').notEmpty(),
  body('client', 'Invalid client!').notEmpty(),
  validate,
];

export const getProjectRules = () => [
  param('id', 'Invalid ID!').isMongoId(),
  validate,

  param('id').custom((id, { req }) => isSameUserOrPartner(id, 'project', req)),
  validate,
];

export const updateProjectRules = () => [
  param('id', 'Invalid ID!').isMongoId(),
  validate,

  param('id').custom((id, { req }) => idExistInDB(id, 'project', req)),
  validate,
];
