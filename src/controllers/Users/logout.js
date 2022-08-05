import { User } from '../../models/index.js';

const logout = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(204);
      const user = await User.findOne({
         where: { refresh_token: refreshToken }
      });
      if (!user) return res.sendStatus(204);
      const { id } = user;
      await User.update({ refresh_token: null }, {
         where: { id }
      });
      res.clearCookie('refreshToken');
      res.json({
         status: 'success',
         message: 'You\'r logout'
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err?.message
      });
   }
}
export default logout;