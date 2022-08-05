import { Sequelize } from 'sequelize';
import { db } from '../configs/index.js';

const { DataTypes } = Sequelize;
export const Category = db.define('categories', {
   name: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   desc: DataTypes.STRING,
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