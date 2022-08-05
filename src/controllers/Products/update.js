import { Product } from '../../models/index.js';
import Validator from 'fastest-validator';
const v = new Validator();

const update = async (req, res) => {
   try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({
         status: 'error',
         message: 'Product not found'
      });
      const body = req.body;
      const schema = {
         name: 'string|empty: false',
         satuan: 'string|empty: false'
      };
      const validate = v.validate(body, schema);
      if (validate.length) return res.status(400).json({
         status: 'error',
         message: validate[0].message
      });
      const data = {
         category_id: body.category_id,
         name: body.name,
         benefit: body.benefit,
         price: body.price,
         stock: body.stock,
         satuan: body.satuan
      }
      await Product.update(data, { where: { id } });
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
