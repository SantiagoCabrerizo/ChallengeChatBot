import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    try {
        const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@challengechatbot.tmkca.mongodb.net/${process.env.MONGO_NAME}?retryWrites=true&w=majority&appName=ChallengeChatBot`;
        await mongoose.connect(uri);
        console.log('MongoDB conectado');
    } catch (err) {
        console.log(err);
    }
};

export default connectDB;
