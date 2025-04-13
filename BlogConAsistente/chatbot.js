document.addEventListener('DOMContentLoaded', () => {
  // Crear el botón fijo para el chatbot
  const chatBtn = document.createElement('button');
  chatBtn.id = 'chatbot-toggle-btn';
  chatBtn.innerHTML = 'Chatbot';
  document.body.appendChild(chatBtn);

  // Crear el contenedor del chatbot (inicialmente oculto)
  const chatContainer = document.createElement('div');
  chatContainer.id = 'chat-container';
  chatContainer.innerHTML = `
    <div id="chatbox">
      <div id="chatlog"></div>
      <input type="text" id="chatInput" placeholder="Escribe tu pregunta..." />
      <button id="sendBtn">Enviar</button>
    </div>
  `;
  document.body.appendChild(chatContainer);

  // Función para alternar la visualización del chatbot
  chatBtn.addEventListener('click', () => {
    chatContainer.style.display = (chatContainer.style.display === 'block') ? 'none' : 'block';
  });

  // Lógica del chat: enviar mensaje y obtener respuesta
  const input = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');
  const chatlog = document.getElementById('chatlog');

  // Manejar evento al presionar Enter
  input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      await sendMessage();
    }
  });

  // Manejar clic en el botón Enviar
  sendBtn.addEventListener('click', async () => {
    await sendMessage();
  });

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;
    
    // Mostrar mensaje del usuario
    chatlog.innerHTML += `<div class="user-msg"><strong>Tú:</strong> ${message}</div>`;
    input.value = '';

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      chatlog.innerHTML += `<div class="bot-msg"><strong>Bot:</strong> ${data.reply}</div>`;
      chatlog.scrollTop = chatlog.scrollHeight;
    } catch (error) {
      chatlog.innerHTML += `<div class="bot-msg error"><strong>Bot:</strong> Error al contactar el servidor.</div>`;
      console.error(error);
    }
  }
});
