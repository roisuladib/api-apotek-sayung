import jwt from 'jsonwebtoken';
import { User } from '../../models/index.js';
import { env } from '../../helpers/index.js';

const refreshToken = async (req, res) => {
   try {
      const {
         ACCESS_TOKEN_SECRET,
         REFRESH_TOKEN_SECRET,
         ACCESS_TOKEN_EXPIRED
      } = env;
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(401);
      const user = await User.findOne({ where: { refresh_token: refreshToken}, include: ['asset'] });
      if (!user) return res.sendStatus(403);
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => { 
         if (err) return res.status(403).json({
            status: 'error',
            message: err.message,
         });
         const { id, name, email, role, asset } = user;
         const token = jwt.sign({ id, name, email, role, asset }, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRED,
         });
         res.json({
            status: 'success',
            message: 'Login',
            token
         });
      })
   } catch (err) {
      return res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}
export default refreshToken;
