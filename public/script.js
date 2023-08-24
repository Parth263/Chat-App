const socket = io();

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesList = document.getElementById('messages');

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    socket.emit('chat message', message);
    messageInput.value = '';
  }
});

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
});