import express from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import Message from './router/Message.js';

const app = express();

app.use(cors());
app.use(express.json());

//Conexión BD
connectDB();

//Rutas
app.use('/message', Message)

export default app;