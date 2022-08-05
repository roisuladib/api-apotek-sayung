import { Unit } from '../../models/index.js';

const getAll = async (req, res) => {
   try {
      const id = req.query.id || [];
      const sql = {
         attributes: ['id', 'name', 'desc']
      }
      if (id.length) sql.where = { id }
      const units = await Unit.findAll(sql);
      res.json({
         status: 'success',
         data: units
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err?.message,
      });
   }
}

export default getAll;