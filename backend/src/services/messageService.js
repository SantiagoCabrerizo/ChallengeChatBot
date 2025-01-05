import Producto from '../models/producto.js';
import Horario from '../models/horario.js';

let botResponse = '';

export const getMenu = async () => {
    const productos = await Producto.find();
    if (productos.length > 0) {
        botResponse = `Aquí te dejo nuestro menú:\n`
        productos.forEach((producto) => {
            botResponse += `- ${producto.nombre} (${producto.descripcion}) $${producto.precio}\n`;
        })
    } else {
        botResponse = 'No hay productos disponibles en estos momentos 😔';
    }
    return botResponse;
}

export const getHorarios = async () => {
    const horarios = await Horario.find();
    botResponse = `Aquí están nuestros horarios:\n`
    horarios.forEach((horario) => {
        botResponse += `- ${horario.dia}: ${horario.apertura}hs - ${horario.cierre}hs\n`;
    })
    return botResponse
}

export const isOpen = async () => {
    try {
        const now = new Date();
        let hora = now.getHours();
        const minuto = now.getMinutes();
        const horarioActual = (hora * 60) + minuto;
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        const diaActual = dias[now.getDay()];
        if (hora === 0) {
            hora = 24;
        }

        const horarios = await Horario.find(
            {
                $or: [
                    { dia: diaActual },
                    { dia: { $regex: diaActual, $options: 'i' } }
                ]
            }
        );
        
        if (horarios.length === 0) {
            botResponse = 'No tenemos horarios para hoy.\n';
            return botResponse;
        }

        horarios.forEach((horario) => {
            const [aperturaHora, aperturaMinutos] = horario.apertura.split(':').map(Number);
            let [cierreHora, cierreMinutos] = horario.cierre.split(':').map(Number);

            if (cierreHora === 0) {
                cierreHora = 24
            }

            const apertura = (aperturaHora * 60) + aperturaMinutos;
            const cierre = (cierreHora * 60) + cierreMinutos;
            if (horarioActual >= apertura && horarioActual <= cierre) {
                botResponse = `¡Estamos abiertos! 😊\nPuedes realizar tu pedido.`;
                return botResponse;
            }
        });

        botResponse = 'Lo siento, estamos cerrados 😔\n';
        botResponse += await getHorarios();
        return botResponse;

    } catch (error) {
        console.error(error)
        return 'Hubo un error al obtener los horarios';
    }
}

export const addPedido = async (clienteData) => {
    try {
        botResponse = `Hola ${clienteData.nombre}, su direccion es ${clienteData.direccion} 😊\n`
        return botResponse
    } catch (error) {
        console.error(error)
    }
}
