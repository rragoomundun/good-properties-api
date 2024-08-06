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

export { updateEmail };
