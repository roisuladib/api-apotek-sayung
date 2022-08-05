import { Supplier } from '../../models/index.js';

const getAll = async (req, res) => {
   try {
      const id = req.query.id || [];
      const sql = {
         attributes: ['id', 'code', 'name', 'telephone', 'email', 'address']
      }
      if (id.length) sql.where = { id }
      const suppliers = await Supplier.findAll(sql);
      res.json({
         status: 'success',
         data: suppliers
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err?.message,
      });
   }
}

export default getAll;