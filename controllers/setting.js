import httpStatus from 'http-status-codes';

import User from '../models/User.js';
import Contact from '../models/Contact.js';

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

/**
 * @api {PUT} /user/setting/contact Update Contact
 * @apiGroup UserSetting
 * @apiName UserSettingContact
 *
 * @apiDesciption Update contact information
 *
 * @apiBody {String} email The contact e-mail
 * @apiBody {String} telephone The contact telephone number
 * @apiBody {String} whatsapp The contact WhatsApp number
 *
 * @apiParamExample {json} Body Example
 * {
 *   "email": "tom.apollo@example.com",
 *   "telephone": "59202743",
 *   "whatsapp": "59202743"
 * }
 *
 * @apiError (Error (400)) INVALID_PARAMETERS One or more parameters are invalid
 *
 * @apiPermission Private
 */
const updateContact = async (req, res, next) => {
  const { email, telephone, whatsapp } = req.body;
  const [contact] = await Contact.findOrCreate({ where: { user_id: req.user.id } });

  contact.email = email;
  contact.telephone = telephone;
  contact.whatsapp = whatsapp;

  await contact.save();

  res.status(httpStatus.OK).end();
};

/**
 * @api {DELETE} /user/setting/delete Delete Account
 * @apiGroup UserSetting
 * @apiName UserSettingDelete
 *
 * @apiDescription Delete the user account
 *
 * @apiPermission Private
 */
const deleteAccount = async (req, res, next) => {
  await User.destroy({ where: { id: req.user.id } });
  res.status(httpStatus.OK).end();
};

export { updateEmail, updatePassword, updateContact, deleteAccount };
