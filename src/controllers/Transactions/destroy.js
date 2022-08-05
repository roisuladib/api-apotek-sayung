import { Transaction } from '../../models/index.js';

const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);
      if (!transaction) return res.status(404).json({
         status: 'error',
         'message': 'Transaction not found'
      });
      await Transaction.destroy({ where: { id } });
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
