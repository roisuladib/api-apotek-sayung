import { Supplier } from '../../models/index.js';
import Validator from 'fastest-validator';
const v = new Validator();

const update = async (req, res) => {
   try {
      const { id } = req.params;
      const supplier = await Supplier.findByPk(id);
      if (!supplier) return res.status(404).json({
         status: 'error',
         message: 'Supplier not found'
      });
      const body = req.body;
      const schema = { name: 'string|empty: false' };
      const validate = v.validate(body, schema);
      if (validate.length) return res.status(400).json({
         status: 'error',
         message: validate
      });
      const data = {
         name: body.name,
         telephone: body.telephone,
         email: body.email,
         address: body.address
      }
      await Supplier.update(data, { where: { id } });
      res.json({
         status: 'success',
         message: 'Updated'
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err?.message,
      });
   }
}

export default update;