import { getMenu, getHorarios, isOpen, addPedido } from '../services/messageService.js';

let clienteData = {}
let chatState = {}

export const handleMessage = async (req, res) => {
    const { userMessage } = req.body;
    let botResponse = ''
    try {
        const message = userMessage.toLowerCase();

        //Ejecuta si el cliente quiere realizar un pedido
        if (chatState.pedido) {
            if (!clienteData.nombre) {
                clienteData.nombre = userMessage
                botResponse = '¿Cuál es su dirección? 😊\n'
            } else if (!clienteData.direccion) {
                clienteData.direccion = userMessage
                botResponse = await addPedido(clienteData)
                chatState.pedido = false
            } else {
                await addPedido(clienteData)
                chatState.pedido = false
            }
        } else {
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
                case (message.includes('pedido')):
                    botResponse = 'Antes de realizar el pedido, ¿Cuál es tu nombre? 😊\n';
                    chatState.pedido = true
                    break
                default:
                    botResponse = 'No entendimos 😔';
                    break;
            }
        }

        res.send(botResponse);
    } catch (error) {
        console.error(error);
    }

}
