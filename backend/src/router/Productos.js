// import express from 'express';
// import Producto from '../models/producto.js';

// const router = express.Router();

// router.get('/', async(req, res) => {
//     try {
//         const productos = await Producto.find();
//         console.log('Productos: ', productos);
//         if (productos.length === 0) {
//             res.status(404).json({ error: 'No hay productos' });
//         }
//         res.json(productos);
//     } catch (error) {
//         console.error(error);
//     }
// });

// export default router;