import { User } from '../../models/index.js';
import Validator from 'fastest-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../../helpers/index.js';
const v = new Validator();

const login = async (req, res) => {
   try {
      const schema = {
         email: 'email|empty: false',
         password: 'string|min: 8',
      }
      const body = req.body;
      const validate = v.validate(body, schema);
      if (validate.length) return res.status(400).json({
         status: 'error',
         message: validate[0].message
      });
      const user = await User.findOne({
         where: { email: body.email.toLowerCase() },
         include: ['asset']
      });
      if (!user) return res.status(404).json({
         status: 'error',
         message: 'Email incorect'
      });
      const match = await bcrypt.compare(body.password, user.password);
      if (!match) return res.status(400).json({
         status: 'error',
         message: 'Wrong password'
      });
      const { id, name, email, role, asset } = user;
      const {
         ACCESS_TOKEN_SECRET,
         REFRESH_TOKEN_SECRET,
         ACCESS_TOKEN_EXPIRED,
         REFRESH_TOKEN_EXPIRED
      } = env;
      const token = jwt.sign({ id, name, email, role, asset }, ACCESS_TOKEN_SECRET, {
         expiresIn: ACCESS_TOKEN_EXPIRED
      });
      const refreshToken = jwt.sign({ id, name, email, role, asset }, REFRESH_TOKEN_SECRET, {
         expiresIn: REFRESH_TOKEN_EXPIRED
      });
      await User.update({ refresh_token: refreshToken }, { where: { id } });
      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000
      });
      res.json({
         status: 'success',
         message: 'Login successfully',
         token
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}
export default login;