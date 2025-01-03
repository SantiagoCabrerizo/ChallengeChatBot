import mongoose from 'mongoose';
const {Schema} = mongoose;

const productoSchema = new Schema({
    nombre: String,
    descripcion: String,
    precio: Number,
    categoria: String
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;