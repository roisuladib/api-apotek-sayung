import { User } from '../../models/index.js';

const getId = async (req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
         order: [['id', 'ASC']],
         attributes: ['id', 'nip', 'name', 'email', 'telephone', 'address', 'gender', 'role', 'birthday', 'avatar_id'],
         include: ['asset']
      });
      if (!user) return res.status(404).json({
         status: 'error',
         message: 'User not found'
      })
      res.json({
         status: 'success',
         data: user
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}

export default getId;
