import { Transaction } from '../../models/index.js';

const getId = async (req, res) => {
   try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id, {
         order: [['id', 'ASC']],
         attributes: ['id', 'user_id', 'code', 'name', 'date', 'count', 'total'],
         include: ['user']
      });
      if (!transaction) return res.status(404).json({
         status: 'error',
         message: 'Transaction not found'
      });
      res.json({
         status: 'success',
         data: transaction
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
}

export default getId;
