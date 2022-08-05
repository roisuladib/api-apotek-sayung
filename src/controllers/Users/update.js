import { User } from '../../models/index.js';
import Validator from 'fastest-validator';
import bcrypt from 'bcrypt';

const v = new Validator();

const update = async (req, res) => {
   const { id } = req.params;
   const user = await User.findByPk(id);
   if (!user) return res.status(404).json({
      status: 'error',
      message: 'User not found'
   });
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
   const { name, email, telephone, address, birthday, gender, role } = body;
   if (email) {
      const chekEmail = await User.findOne({ where: { email } });
      if (chekEmail && email !== user.email) return res.status(409).json({
         status: 'error',
         message: 'Email is already exits'
      });   
   }
   if (body.password !== body.confirm_password) {
      return res.status(400).json({
         status: 'error',
         message: 'Confirm password does not match password'
      });
   }
   const salt = await bcrypt.genSalt();
   const password = await bcrypt.hash(body.password, salt);  
   try {
      await User.update({ 
         name, email, password, telephone, address, birthday, gender, role
      }, {
         where: { id }
      });
      return res.json({
         status: 'success',
         message: 'User updated successfully'
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err?.message
      });
   }
}
export default update;