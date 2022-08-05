import { User } from '../../models/index.js';
import Validator from 'fastest-validator';
import bcrypt from 'bcrypt';
const v = new Validator();

const register = async (req, res) => {
   const schema = {
      name: {
         type: 'string',
         min: 6,
         empty: false,
         messages: {
            stringMin: '\'Name\' must be at least 6 words',
            stringEmpty: '\'Name\' must not be empty.'
         }
      },
      email: {
         type: 'email',
         empty: false,
         messages: {
            email: '\'Email\' must be a valid email',
            stringEmpty: '\'Email\' must not be empty.'
         }
      },
      password: {
         type: 'string',
         min: 8,
         empty: false,
         messages: {
            stringMin: '\'Password\' must be at least 6 words.',
            stringEmpty: '\'Password\' must not be empty.',
         }
      }
   }
   const body = req.body;
   const validate = v.validate(body, schema);
   if (validate.length) return res.status(400).json({
      status: 'error',
      message: validate[0].message
   });
   const oldUser = await User.findOne({ where: { email: body.email } });
   if (oldUser) return res.status(409).json({
      status: 'error',
      message: 'Email is already exits'
   });
   if (body.password !== body.confirm_password) {
      return res.status(400).json({
         status: 'error',
         message: 'Confirm password does not match password'
      });
   }
   const serial = await User.count();
   const yearOfEntry = new Date().toISOString().slice(2, 7).split('-').join('');
   const id = body.role ? body.role : '2';
   let cuk = [];
   for (let i = 0; i < serial + 2; i++) {
      const combine = ('000' + i).slice(-4);
      cuk.push(combine);
   }
   const nip = yearOfEntry + id + cuk.pop();
   if (nip) {
      const checkNip = await User.findOne({ where: { nip } });
      if (checkNip && nip !== oldUser.nip) {
         return res.status(409).json({
            status: 'error',
            message: 'NIP already exist!'
         });
      }
   }
   const salt = await bcrypt.genSalt();
   const password = await bcrypt.hash(body.password, salt);
   const data = {
      nip,
      name: body.name,
      email: body.email.toLowerCase(),
      password,
      telephone: body.telephone,
      address: body.address,
      birthday: body.birthday,
      gender: body.gender,
      role: body.role,
      avatar_id: body.avatar_id,
   }
   try {
      const user = await User.create(data);
      return res.json({
         status: 'success',
         message: 'Register successfully',
         data: {
            id: user.id,
            nip: user.nip,
            name: user.name,
            email: user.email
         }
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}
export default register;