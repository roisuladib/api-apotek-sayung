import { Asset } from '../../models/index.js';
import { unlink } from 'fs';

const destroy = async (req, res) => {
   try {
      const { id } = req.params;
      const asset = await Asset.findOne({
         where: { id }
      });
      if (!asset) return res.status(404).json({
         status: 'error',
         message: 'Asset not found'
      });
      const image = asset.image.split('/').pop();
      const filepath = `./public/images/${image}`;
      unlink(filepath, async err => {
         if (err) return res.status(404).json({
            status: 'error',
            message: err.message
         });
         await Asset.destroy({
            where: { id }
         });
         res.json({
            status: 'success',
            message: 'Asset deleted'
         });
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}

export default destroy;