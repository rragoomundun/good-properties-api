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

export { updateEmailValidator };
