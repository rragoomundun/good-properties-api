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

/**
 * @api {POST} /auth/login Login
 * @apiGroup Auth
 * @apiName AuthLogin
 * 
 * @apiDescription Login a user.
 * 
 * @apiBody {String} email User's email
 * @apiBody {String} password User's password
 * 
 * @apiParamExample {json} Body Example
 * {
 *   "email": "tom.apollo@gmail.com",
 *   "password": "pfs83a01jH;B"
 * }
 * 
 * @apiSuccess (Success (200)) {String} token JWT token
 * @apiSuccessExample Success Example
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNmY0MDQ1MzVlNzU3NWM1NGExNTMyNyIsImlhdCI6MTU4NDM0OTI1MywiZXhwIjoxNTg2OTQxMjUzfQ.2f59_zRuYVXADCQWnQb6mG8NG3zulj12HZCgoIdMEfw"
 * }

 * @apiError (Error (400)) INVALID_PARAMETERS One or more parameters are invalid
 * @apiError (Error (401)) INVALID The data entered is invalid
 * @apiError (Error (401)) UNCONFIRMED The account is unconfirmed
 *
 * @apiPermission Public
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.verifyPassword(password, user.password))) {
    return next(new ErrorResponse('Data entered invalid', httpStatus.UNAUTHORIZED, 'INVALID'));
  }

  const token = await Token.findOne({ where: { user_id: user.id } });

  if (token && token.type === 'register-confirm') {
    return next(new ErrorResponse('Account unconfirmed', httpStatus.UNAUTHORIZED, 'UNCONFIRMED'));
  }

  sendTokenResponse(user.id, httpStatus.OK, res);
};

// Create token from model, create cookie, and send response
const sendTokenResponse = async (userId, statusCode, res) => {
  const user = await User.findOne({ where: { id: userId } });
  const token = user.getSignedJWTToken(userId);

  const options = {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * process.env.JWT_COOKIE_EXPIRE),
    sameSite: 'None',
    secure: true
  };

  res.status(statusCode).cookie('token', token, options).json({ token });
};

export { register, login };
