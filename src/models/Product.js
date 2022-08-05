import { Sequelize } from 'sequelize';
import { db } from '../configs/index.js';
import { Category } from './index.js';

const { DataTypes } = Sequelize;
export const Product = db.define('products', {
   category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   code: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   benefit: DataTypes.STRING,
   price: {
      type: DataTypes.DOUBLE,
      allowNull: false
   },
   stock: {
      type: DataTypes.INTEGER,
      allowNull: false
   },
   satuan: {
      type: DataTypes.STRING,
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

Category.hasOne(Product, {
   as: 'category',
   foreignKey: 'category_id',
   targetKey: 'id'
});
Product.belongsTo(Category, {
   as: 'category',
   foreignKey: 'category_id',
   targetKey: 'id'
});


(async () => {
   await db.sync();
})();
