import httpsStatus from 'http-status-codes';

import User from '../models/User.js';

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

export { getCurrentUser };
