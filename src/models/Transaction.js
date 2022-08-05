import { Sequelize } from 'sequelize';
import { db } from '../configs/index.js';
import { User } from './index.js';

const { DataTypes } = Sequelize;
export const Transaction = db.define('transactions', {
   user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   code: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   date: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   count: {
      type: DataTypes.STRING,
      allowNull: false
   },
   total: {
      type: DataTypes.DOUBLE,
      allowNull: false
   },
   createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
   },
   updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
   }
}, {
   freezeTableName: true,
});

Transaction.belongsTo(User, {
   as: 'user',
   foreignKey: 'user_id',
   targetKey: 'id'
});


(async () => {
   await db.sync();
})();
