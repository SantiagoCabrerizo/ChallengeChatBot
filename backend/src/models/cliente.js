import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
    nombre: String,
    telefono: Number,
    direccion: String
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;