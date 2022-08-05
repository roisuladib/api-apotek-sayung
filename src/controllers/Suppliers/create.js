import { Supplier } from '../../models/index.js';
import Validator from 'fastest-validator';
const v = new Validator();

const create = async (req, res) => {
   try {
      const schema = { name: 'string|empty: false' };
      const body = req.body;
      const validate = v.validate(body, schema);
      if (validate.length) return res.status(400).json({
         status: 'error',
         message: validate
      });
      let serial = await Supplier.count();
      let cuk = [];
      for (let i = 0; i < serial + 2; i++) {
         const combine = ('000' + i).slice(-4);
         cuk.push(combine);
      }
      const code = `sp-${cuk.pop()}`;
      const data = {
         code,
         name: body.name,
         telephone: body.telephone,
         email: body.email,
         address: body.address
      };
      const supplier = await Supplier.create(data);
      res.json({
         status: 'success',
         data: supplier
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message,
      });
   }
}

export default create;