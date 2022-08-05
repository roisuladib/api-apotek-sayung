import { Unit } from '../../models/index.js';

const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const unit = await Unit.findByPk(id);
      if (!unit) return res.status(404).json({
         status: 'error',
         'message': 'Unit not found'
      });
      await Unit.destroy({ where: { id } });
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