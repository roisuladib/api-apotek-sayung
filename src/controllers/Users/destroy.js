import { User } from '../../models/index.js';

const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findOne({
         where: { id }
      });
      if (!user) return res.status(404).json({
         status: 'error',
         message: 'User not found'
      });
      await User.destroy({ where: { id } });
      res.json({
         status: 'success',
         message: 'User deleted'
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}

export default destroy;