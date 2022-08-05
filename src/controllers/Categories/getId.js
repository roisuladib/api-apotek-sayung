import { Category } from '../../models/index.js';

const getId = async (req, res) => {
   try {
      const { id } = req.params;
      const categories = await Category.findByPk(id, {
         order: [['id', 'ASC']],
         attributes: ['id', 'name', 'desc']
      });
      if (!categories) return res.status(404).json({
         status: 'error',
         message: 'Category not found'
      });
      res.json({
         status: 'success',
         data: categories
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
}

export default getId;
