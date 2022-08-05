import { Transaction } from '../../models/index.js';

const getAll = async (req, res) => {
   try {
      const id = req.query.id || [];
      const sql = {
         order: [['id', 'ASC']],
         attributes: ['id', 'user_id', 'code', 'name', 'date', 'count', 'total'],
         include: ['user']
      }
      if (id.length) sql.where = { id }
      const transactions = await Transaction.findAll(sql);
      res.json({
         status: 'success',
         data: transactions
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err?.message,
      });
   }
}

export default getAll;
