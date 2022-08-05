import { Product } from '../../models/index.js';

const getAll = async (req, res) => {
   try {
      const id = req.query.id || [];
      const sql = {
         order: [['id', 'ASC']],
         attributes: ['id', 'category_id', 'code', 'name', 'benefit', 'price', 'stock', 'satuan'],
         include: ['category']
      }
      if (id.length) sql.where = { id }
      const product = await Product.findAll(sql);
      res.json({
         status: 'success',
         data: product
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err?.message,
      });
   }
}

export default getAll;
