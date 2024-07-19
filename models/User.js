import { DataTypes } from 'sequelize';

import dbUtil from '../utils/db.js';

const User = dbUtil.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false, tableName: 'users' }
);

export default User;
