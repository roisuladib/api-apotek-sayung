import { Unit } from '../../models/index.js';

const getId = async (req, res) => {
   try {
      const { id } = req.params;
      const units = await Unit.findByPk(id, {
         attributes: ['id', 'name', 'desc']
      });
      if (!units) return res.status(404).json({
         status: 'error',
         message: 'Unit not found'
      });
      res.json({
         status: 'success',
         data: units
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
}

export default getId;