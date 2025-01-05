import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    productos: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto'
        },
        cantidad: {
            type: Number,
            min: 1
        }
    }],
    total: Number,
    estado: {
        type: String,
        enum: ['Pendiente', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'],
        default: 'Pendiente'
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Pedido', pedidoSchema);