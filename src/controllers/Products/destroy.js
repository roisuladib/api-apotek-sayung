import { Product } from '../../models/index.js';

const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({
         status: 'error',
         'message': 'Product not found'
      });
      await Product.destroy({ where: { id } });
      res.json({
         status: 'success',
         message: 'Deleted'
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
};

export default destroy;
