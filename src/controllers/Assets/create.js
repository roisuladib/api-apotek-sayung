import { Asset } from '../../models/index.js';
import path from 'path';

const create = async (req, res) => {
   try {
      if (req.files === null) return res.status(400).json({
         status: 'error',
         message: 'No file uploaded'
      });
      const { image }   = req.files;
      const fileSize    = image.data.length;
      const ext         = path.extname(image.name);
      const fileName    = Date.now() + ext;
      const url         = `${req.protocol}://${req.get('host')}/images/${fileName}`;
      const allowedType = ['.png', '.jpg', '.jpeg', '.svg'];
   
      if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({
         status: 'error',
         message: 'Invalid image'
      });
      if (fileSize > 2000000) return res.status(422).json({
         status: 'error',
         message: 'Image must be less than 2 mb'
      });
      image.mv(`./public/images/${fileName}`, async (err) => {
         if (err) return res.status(500).json({
            status: 'error',
            message: err.message
         });
         try {
            await Asset.create({ image: url })
            res.json({
               status: 'success',
               message: 'Asset created',
               url
            })
         } catch (err) {
            res.status(500).json({
               status: 'error',
               message: err.message
            });
         }
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}

export default create;