import { Unit } from '../../models/index.js';
import Validator from 'fastest-validator';
const v = new Validator();

const update = async (req, res) => {
   try {
      const { id } = req.params;
      const unit = await Unit.findByPk(id);
      if (!unit) return res.status(404).json({
         status: 'error',
         message: 'Unit not found'
      });
      const { name, desc } = req.body;
      const schema = { name: 'string|empty: false' };
      const validate = v.validate({ name }, schema);
      if (validate.length) return res.status(400).json({
         status: 'error',
         message: validate
      });
      await Unit.update({ name, desc }, {
         where: { id }
      });
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