import { User } from '../../models/index.js';

const getAll = async (req, res) => {
   try {
      const id = req.query.id || [];
      const sql = {
         order: [['id', 'ASC']],
         attributes: ['id', 'nip', 'name', 'email', 'telephone', 'address', 'gender', 'role', 'birthday', 'avatar_id'],
         include: ['asset']
      }
      if (id.length) sql.where = { id };
      const users = await User.findAll(sql);
      res.json({
         status: 'success',
         message: users?.length > 0 ? 'List users' : 'Users null',
         data: users
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}

export default getAll;
