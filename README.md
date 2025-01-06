# Challenge Chatbot para pedir sushi
Chatbot diseñado para gestionar los pedidos de un restaurante de sushi. Este proyecto incluye funcionalidades como mostrar el menú, responder preguntas comunes como: ¿Están abiertos?; mostrar los horarios y registrar pedidos.
## Tecnologías Utilizadas
* **Backend**: NodeJS, JavaScript
* **Frontend**: React, Tailwind
* **Base de datos**: MongoDB
## Cómo instalar y correr el chatbot
### 1. Clonar el repositorio
Clona el repositorio en tu máquina local:
```
git clone https://github.com/SantiagoCabrerizo/ChallengeChatBot.git
cd ChallengeChatBot
```
### 2. Configurar el Backend
1. Accede a la carpeta del backend
```
cd backend
```
2. Instala las dependencias
```
npm install
```
3. Crea un archivo .env en la carpeta backend con el siguiente contenido:
```
MONGO_USER=<NOMBRE_USUARIO>
MONGO_PASSWORD=<CONTRASEÑA>
MONGO_NAME=<NOMBRE_CLUSTER>
PORT=4000
```
4. Corre el servidor:
```
npm start
```
El backend estará disponible en: http://localhost:4000
### 3. Configurar el Frontend
1. Accede a la carpeta frontend:
```
cd frontend
```
2. Instala las dependencias
```
npm install
```
3. Corre el servidor
```
npm start
```
## Ejemplos de mensajes que entiende el bot
A continuación, algunos ejemplos de mensajes que el bot puede interpretar y responder:\n
* **Bienvenida**: "Hola", "Buenas tardes", "Buenas noches" | **Palabras claves: hola, buenas**
* **Menú**: "Quiero ver la carta", "Quiero ver el menu" | **Palabras claves: menu, menú, carta**
* **Horarios**: "En qué horarios están disponibles?", "En qué horario abren?" | **Palabras claves: horarios, disponibles**
* **Disponibilidad en el momento**: ¿Están abiertos?, ¿Tienen abierto el local ahora? | **Palabras claves: abierto**
* **Pedido**: "Quiero pedir", "Quiero realizar un pedido" | **Palabras claves: pedido, pedir**
## Endpoints disponibles
POST /message \
**Descripción**: Endpoint principal para enviar mensajes al chatbot.
* Request Body:
```
{
  "userMessage":"Hola, quiero ver menu"
}
```
* Response:
```
¡Hola! Bienvenidos a nuestro Sushi Bot 🍣 ¿En qué puedo ayudarte?
```
## Notas
* La base de datos está alojada en MondoDB, mientras que el backend y el frontend deben correr localmente.
* Asegúrate de contar con Node y una conexión a internet para interactuar con la base de datos.
