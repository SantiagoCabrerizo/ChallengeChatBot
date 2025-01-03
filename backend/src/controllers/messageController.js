import { getMenu, getHorarios, isOpen } from '../services/messageService.js';

export const handleMessage = async (req, res) => {
    const { userMessage } = req.body;
    let botResponse = ''
    try {
        const message = userMessage.toLowerCase();

        switch (true) {
            case (message.includes('hola') || message.includes('buenas')):
                botResponse = '¡Hola! Bienvenidos a nuestro Sushi Bot 🍣 ¿En qué puedo ayudarte?';
                break;
            case (message.includes('menu') || message.includes('menú') || message.includes('carta')):
                botResponse = await getMenu()
                break;
            case (message.includes('horarios') || message.includes('disponibles')):
                botResponse = await getHorarios()
                break;
            case (message.includes('abierto')):
                botResponse = await isOpen()
                break;
            default:
                botResponse = 'No entendimos 😔';
                break;
        }
        res.send(botResponse);
    } catch (error) {
        console.error(error);
    }
}