import User from '../models/User.js';
import Token from '../models/Token.js';

import dbUtil from './db.js';

const deleteUser = async (userId) => {
  try {
    await dbUtil.transaction(async (transaction) => {
      await Token.destroy({ where: { user_id: userId } }, { transaction });
      await User.destroy({ where: { id: userId } }, { transaction });
    });
  } catch {}
};

const deleteUsers = async (userIds) => {
  try {
    await dbUtil.transaction(async (transaction) => {
      await Token.destroy(
        {
          where: {
            user_id: { [Op.in]: userIds }
          }
        },
        { transaction }
      );
      await User.destroy(
        {
          where: {
            id: { [Op.in]: userIds }
          }
        },
        { transaction }
      );
    });
  } catch {}
};

export default { deleteUser, deleteUsers };
