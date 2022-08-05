import { Sequelize } from 'sequelize';
import { db } from '../configs/index.js';

const { DataTypes } = Sequelize;
export const Asset = db.define('assets', {
   image: DataTypes.STRING,
   createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false
   },
   updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
   },
}, {
   freezeTableName: true
});

(async () => {
   await Asset.sync();
})();