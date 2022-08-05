import { Category } from '../../models/index.js';
import Validator from 'fastest-validator';
const v = new Validator();

const create = async (req, res) => {
   try {
      const { name, desc } = req.body;
      const schema = { name: 'string|empty: false' };
      const validate = v.validate({ name } , schema);
      if (validate.length) return res.status(400).json({
         status: 'error',
         message: validate
      });
      const data =  await Category.create({ name, desc });
      res.json({
         status: 'success',
         data
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
}

export default create;