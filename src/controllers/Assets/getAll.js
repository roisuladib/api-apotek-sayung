import { Asset } from '../../models/index.js';

const getAll = async (req, res) => {
   try {
      const assets = await Asset.findAndCountAll({
         attributes: ['id', 'image']
      });
      res.json({
         status: 'success',
         message: assets?.rows?.length > 0 ? 'List assets' : 'Assets null',
         data: assets
      });
   } catch (err) {
      res.status(500).json({
         status: 'error',
         message: err.message
      });
   }
}

export default getAll;