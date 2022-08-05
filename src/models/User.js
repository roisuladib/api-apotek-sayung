import { Sequelize } from 'sequelize';
import { db } from '../configs/index.js';
import { Asset } from './Asset.js';

const { DataTypes } = Sequelize;
export const User = db.define('users', {
   nip: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false
   },
   telephone: DataTypes.STRING,
   address: DataTypes.STRING,
   birthday: DataTypes.DATEONLY,
   gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female', 'other'],
      defaultValue: 'other'
   },
   role: {
      type: DataTypes.ENUM,
      values: ['0', '1', '2'],
      defaultValue: '2',
      allowNull: false
   },
   refresh_token: DataTypes.TEXT,
   avatar_id: DataTypes.INTEGER,
   createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false
   },
   updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false
   },
}, {
   freezeTableName: true
});

Asset.hasOne(User, {
   as: 'asset',
   foreignKey: 'avatar_id',
   targetKey: 'id'
});
User.belongsTo(Asset, {
   as: 'asset',
   foreignKey: 'avatar_id',
   targetKey: 'id'
});

(async () => {
   await User.sync();
})();