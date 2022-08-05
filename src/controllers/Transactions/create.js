import { Transaction } from '../../models/index.js';
import Validator from 'fastest-validator';
const v = new Validator();

const create = async (req, res) => {
   // try {
   //    const schema = {
   //       name: 'string|empty: false',
   //       satuan: 'string|empty: false'
   //    };
   //    // const schema = {
   //    //    category_id: 'integer|empty: false',
   //    //    name: 'string|empty: false',
   //    //    price: 'integer|empty: false',
   //    //    stock: 'integer|empty: false',
   //    //    satuan: 'string|empty: false'
   //    // };
   //    const body = req.body;
   //    const validate = v.validate(body, schema);
   //    if (validate.length) return res.status(400).json({
   //       status: 'error',
   //       message: validate[0].message
   //    });
   //    let serial = await Product.count();
   //    let cuk = [];
   //    for (let i = 0; i < serial + 2; i++) {
   //       const combine = ('000' + i).slice(-4);
   //       cuk.push(combine);
   //    }
   //    const code = `pr-${cuk.pop()}`;
   //    const data = {
   //       category_id: body.category_id,
   //       code,
   //       name: body.name,
   //       benefit: body.benefit,
   //       price: body.price,
   //       stock: body.stock,
   //       satuan: body.satuan
   //    };
   //    const product = await Product.create(data);
   //    res.json({
   //       status: 'success',
   //       data: product
   //    });
   // } catch (err) {
   //    res.status(500).json({
   //       status: 'error',
   //       message: err.message,
   //    });
   // }
}

export default create;
