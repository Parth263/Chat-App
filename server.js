const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  const emojiMap = {
    react: "⚛️",
    woah: "😲",
    hey: "👋",
    lol: "😂",
    like: "🤍",
    congratulations: "🎉",
  };
  

   socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    // Check if the message contains any keywords from the emoji map
    Object.keys(emojiMap).forEach((keyword) => {
      if (msg.includes(keyword)) {
        // Replace the keyword with its corresponding emoji
        msg = msg.replace(keyword, emojiMap[keyword]);
      }
    });

    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(28000, () => {
  console.log('Server is running on http://localhost:28000');
});
