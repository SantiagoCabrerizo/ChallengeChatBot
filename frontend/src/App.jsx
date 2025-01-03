import { useState } from "react"
import axios from 'axios'

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  // Función para enviar mensaje
  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, sender: 'user' };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      //Llamada a la API
      const response = await axios.post('http://localhost:4000/message', {
        userMessage: input
      });

      // Agregar mensaje al chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data, sender: 'bot' },
      ]);
    } catch (error) {
      console.error(error)
    }


  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg flex flex-col h-[600px]">

        <header className="bg-blue-500 text-white p-4 text-center rounded-t-lg">
          <h1 className="text-xl font-semibold">Sushi Bot</h1>
        </header>

        {/* Chat */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-full">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`} style={{ whiteSpace: 'pre-wrap' }}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white p-4 border-t flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
