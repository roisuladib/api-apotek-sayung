import { Sequelize } from 'sequelize';
import { db } from '../configs/index.js';

const { DataTypes } = Sequelize;
export const Supplier = db.define('suppliers', {
   code: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   telephone: DataTypes.STRING,
   email: DataTypes.STRING,
   address: DataTypes.STRING,
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

(async () => {
   await db.sync();
})();