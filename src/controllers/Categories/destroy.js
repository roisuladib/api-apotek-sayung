import { Category } from '../../models/index.js';

const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) return res.status(404).json({
         status: 'error',
         'message': 'Category not found'
      });
      await Category.destroy({ where: { id } });
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