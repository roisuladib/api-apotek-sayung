import { Supplier } from '../../models/index.js';

const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const supplier = await Supplier.findByPk(id);
      if (!supplier) return res.status(404).json({
         status: 'error',
         'message': 'Supplier not found'
      });
      await Supplier.destroy({ where: { id } });
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