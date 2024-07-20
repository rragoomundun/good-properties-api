import { DataTypes } from 'sequelize';

import cryptUtil from '../utils/crypt.js';
import dbUtil from '../utils/db.js';

const Token = dbUtil.define(
  'Token',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    expire: {
      type: DataTypes.DATE,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('register-confirm', 'password-reset'),
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'tokens',
    hooks: {
      beforeCreate: (token) => {
        token.value = cryptUtil.getDigestHash(cryptUtil.getToken());
        token.expire = Date.now() + 1000 * 60 * 60; // Expires in 1 hour
      }
    }
  }
);

export default Token;
