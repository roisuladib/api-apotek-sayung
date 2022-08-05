import { Supplier } from '../../models/index.js';

const getId = async (req, res) => {
   try {
      const { id } = req.params;
      const suppliers = await Supplier.findByPk(id, {
         attributes: ['id', 'code', 'name', 'telephone', 'email', 'address']
      });
      if (!suppliers) return res.status(404).json({
         status: 'error',
         message: 'Supplier not found'
      });
      res.json({
         status: 'success',
         data: suppliers
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
}

export default getId;