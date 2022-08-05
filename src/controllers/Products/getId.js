import { Product } from '../../models/index.js';

const getId = async (req, res) => {
   try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
         order: [['id', 'ASC']],
         attributes: ['id', 'category_id', 'code', 'name', 'benefit', 'price', 'stock', 'satuan'],
         include: ['category']
      });
      if (!product) return res.status(404).json({
         status: 'error',
         message: 'Product not found'
      });
      res.json({
         status: 'success',
         data: product
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
}

export default getId;
