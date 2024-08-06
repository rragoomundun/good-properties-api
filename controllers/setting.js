import httpStatus from 'http-status-codes';

import User from '../models/User.js';

/**
 * @api {PUT} /user/setting/email Update E-Mail
 * @apiGroup UserSetting
 * @apiName UserSettingEmail
 *
 * @apiDescription Update the user e-mail
 *
 * @apiBody {String} email The new e-mail
 *
 * @apiParamExample {json} Body Example
 * {
 *   "email": "tom.apollo@fakemail.com"
 * }
 *
 * @apiError (Error (400)) INVALID_PARAMETERS One or more parameters are invalid
 *
 * @apiPermission Private
 */
const updateEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { id: req.user.id } });

  user.email = email;

  await user.save();

  res.status(httpStatus.OK).end();
};

/**
 * @api {PUT} /user/setting/password Update Password
 * @apiGroup UserSetting
 * @apiName UserSettingPassword
 *
 * @apiDescription Update the user password
 *
 * @apiBody {String} password The new password
 * @apiBody {String} repeatedPassword The repeated new password
 *
 * @apiParamExample {json} Body Example
 * {
 *   "password": "123456789012",
 *   "repeatedPassword": "123456789013"
 * }
 *
 * @apiError (Error (400)) INVALID_PARAMETERS One or more parameters are invalid
 *
 * @apiPermission Private
 */
const updatePassword = async (req, res, next) => {
  const { password } = req.body;
  const user = await User.findOne({ where: { id: req.user.id } });

  user.password = password;

  await user.save();

  res.status(httpStatus.OK).end();
};

export { updateEmail, updatePassword };
