import { Category } from '../../models/index.js';

const getAll = async (req, res) => {
   try {
      const id = req.query.id || [];
      const sql = {
         order: [['id', 'ASC']],
         attributes: ['id', 'name', 'desc']
      }
      if (id.length) sql.where = { id }
      const categories = await Category.findAll(sql);
      res.json({
         status: 'success',
         data: categories
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err?.message,
      });
   }
}

export default getAll;
