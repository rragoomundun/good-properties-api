import { body } from 'express-validator';

import User from '../models/User.js';

import validation from './validation.js';

const updateEmailValidator = validation([
  body('email')
    .notEmpty()
    .withMessage('message=Please add an email;type=NO_EMAIL')
    .isEmail()
    .withMessage('message=Please add a valid email;type=INVALID_EMAIL')
    .custom(async (email) => {
      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        throw new Error('message=The email address is already in use;type=EMAIL_IN_USE');
      }
    })
]);

const updatePasswordValidator = validation([
  body('password')
    .notEmpty()
    .withMessage('message=Please add a password;type=NO_PASSWORD')
    .isLength({ min: process.env.PASSWORD_MIN_LENGTH })
    .withMessage(
      `message=The password has to have at least ${process.env.PASSWORD_MIN_LENGTH} characters;type=PASSWORD_MIN_LENGTH`
    ),
  body('repeatedPassword')
    .notEmpty()
    .withMessage('message=Please add the repeated password;type=NO_REPEATED_PASSWORD')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(`message=The repeated password doesn't match the password;type=REPEATED_PASSWORD_NO_MATCH`);
      }

      return true;
    })
]);

export { updateEmailValidator, updatePasswordValidator };
