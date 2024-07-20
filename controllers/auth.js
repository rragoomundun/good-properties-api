import httpStatus from 'http-status-codes';

import User from '../models/User.js';
import Token from '../models/Token.js';

import dbUtil from '../utils/db.js';
import userUtil from '../utils/user.js';
import mailUtil from '../utils/mail.js';

import ErrorResponse from '../classes/ErrorResponse.js';

/**
 * @api {POST} /auth/register Register
 * @apiGroup Auth
 * @apiName AuthRegister
 *
 * @apiDescription Register a new user in the database.
 *
 * @apiBody {String} email User's email
 * @apiBody {String{12..}} password User's password
 * @apiBody {String{12..}} repeatedPassword The repeated password
 *
 * @apiParamExample {json} Body Example
 * {
 *   "email": "tom.apollo@gmail.com",
 *   "password": "pfs83a01jH;B",
 *   "repeatedPassword": "pfs83a01jH;B"
 * }
 *
 * @apiError (Error (400)) INVALID_PARAMETERS One or more parameters are invalid
 * @apiError (Error (500)) ACCOUNT_CREATION Cannot create account
 *
 * @apiPermission Public
 */
const register = async (req, res, next) => {
  const { email, password } = req.body;
  let result;

  try {
    result = await dbUtil.transaction(async (transaction) => {
      const user = await User.create({ email, password }, { transaction });
      const token = await Token.create(
        { type: 'register-confirm', value: 'empty', expire: Date.now(), user_id: user.id },
        { transaction }
      );

      return { user, token };
    });
  } catch {
    return next(new ErrorResponse('Account creation failed', httpStatus.INTERNAL_SERVER_ERROR, 'ACCOUNT_CREATION'));
  }

  // Send confirmation e-mail
  try {
    const mailOptions = {
      mail: 'registration',
      userId: result.user.id,
      templateOptions: {
        confirmationLink: `${process.env.APP_URL}/register/confirm/${result.token.value}`
      }
    };
    await mailUtil.send(mailOptions);
  } catch {
    await userUtil.deleteUser(result.user.id);
    return next(new ErrorResponse('Account creation failed', httpStatus.INTERNAL_SERVER_ERROR, 'ACCOUNT_CREATION'));
  }

  res.status(httpStatus.CREATED).end();
};

export { register };
