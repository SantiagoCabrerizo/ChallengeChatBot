import mongoose from 'mongoose';

const horarioSchema = new mongoose.Schema({
    apertura: String,
    cierre: String,
    dia: String
});

const Horario = mongoose.model('Horario', horarioSchema);

export default Horario;