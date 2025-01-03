import express from 'express';
import Cliente from '../models/cliente.js';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const clientes = await Cliente.find();
        console.log('Clientes: ', clientes);
        if (clientes.length === 0) {
            res.status(404).json({ error: 'No hay clientes' });
        }
        res.json(clientes);
    } catch (error) {
        console.error(error);
    }
});

router.post('/crearCliente', async(req, res) => {
    try {
        const cliente = new Cliente({
            nombre: req.body.nombre,
            telefono: Number(req.body.telefono)
        });
        await cliente.save();
        res.json(cliente);
    } catch (error) {
        console.error(error);
    }
});

export default router;