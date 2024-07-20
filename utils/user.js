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

export default { deleteUser };
