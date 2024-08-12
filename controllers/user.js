import httpsStatus from 'http-status-codes';

import User from '../models/User.js';
import Contact from '../models/Contact.js';

/**
 * @api {GET} /user Get Current User
 * @apiGroup User
 * @apiName UserGetCurrentUser
 *
 * @apiDescription Get the current user
 *
 * @apiSuccess (Success (200)) id The user id
 * @apiSuccess (Success (200)) email The user email
 *
 * @apiSuccessExample Success Example
 * {
 *   "id": 7,
 *   "email": "tom.apollo@example.com"
 * }
 *
 * @apiPermission Private
 */
const getCurrentUser = async (req, res, next) => {
  const userData = await User.findOne({ where: { id: req.user.id } });
  const user = {
    id: req.user.id,
    email: userData.email
  };

  res.status(httpsStatus.OK).json(user);
};

/**
 * @api {GET} /user/contact Get Current User Contact
 * @apiGroup User
 * @apiName UserGetCurrentUserContact
 *
 * @apiDescription Get contact information for the current user.
 *
 * @apiSuccess (Success (200)) email The contact e-mail
 * @apiSuccess (Success (200)) telephone The contact telephone number
 * @apiSuccess (Success (200)) whatsapp The contact WhatsApp number
 *
 * @apiSuccessExample Success Example
 * {
 *   "email": "tom.apollo@example.com",
 *   "telephone": "49401852",
 *   "whatsapp": "49401852"
 * }
 *
 * @apiPermission Private
 */
const getCurrentUserContact = async (req, res, next) => {
  const contactData = await Contact.findOne({ where: { user_id: req.user.id } });
  const contact = {
    email: '',
    telephone: '',
    whatsapp: ''
  };

  if (contactData !== null) {
    contact.email = contactData.email;
    contact.telephone = contactData.telephone;
    contact.whatsapp = contactData.whatsapp;
  }

  res.status(httpsStatus.OK).json(contact);
};

export { getCurrentUser, getCurrentUserContact };
