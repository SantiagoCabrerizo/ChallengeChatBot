import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
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
    },
    cliente: [
        {
            nombre: String,
            direccion: String
        }
    ]
})

export default mongoose.model('Pedido', pedidoSchema);