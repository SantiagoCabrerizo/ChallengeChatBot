import Producto from '../models/producto.js';
import Horario from '../models/horario.js';
import Pedido from '../models/pedido.js';

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
                    { dia: { $regex: diaActual, $options: 'i' } },
                    { dia: { $regex: 'Lunes a Viernes', $options: 'i' } }
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
        const productosPedido = clienteData.pedido.split('y').map((item) => item.trim());
        const productosConCantidad = [];
        for (const pedido of productosPedido) {
            const regex = /^(\d+)\s+(.*)$/;
            const match = pedido.match(regex);

            if (!match) {
                return `El formato del pedido "${pedido}" no es válido.\nUsa "cantidad nombre de producto".`;
            }

            const cantidad = parseInt(match[1], 10);
            const nombreProducto = match[2].trim();

            const producto = await Producto.findOne({
                nombre: {
                    $regex: new RegExp(`^${nombreProducto}$`, 'i')
                }
            });

            if (!producto) {
                return `El producto "${nombreProducto}" no está disponible. Por favor, revisa tu pedido.`;
            }

            productosConCantidad.push({ producto: producto._id, cantidad });
        }

        //Total
        const total = await productosConCantidad.reduce(async (sumPromise, { producto, cantidad }) => {
            const sum = await sumPromise;
            const productoData = await Producto.findById(producto);
            return sum + productoData.precio * cantidad;
        }, Promise.resolve(0));

        const nuevoPedido = new Pedido({
            productos: productosConCantidad,
            total,
            cliente: { nombre: clienteData.nombre, direccion: clienteData.direccion }
        });

        await nuevoPedido.save();

        return `${clienteData.nombre}, su pedido se realizó correctamente.\nSu total es de $${total}`;
    } catch (error) {
        console.error(error)
    }
}
