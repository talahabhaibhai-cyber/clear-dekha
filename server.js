const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'));
io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => { socket.join(roomId); });
  socket.on('new-viewer', (data) => { socket.to(data.roomId).emit('new-viewer', data.viewerId); });
  socket.on('offer', (data) => { socket.to(data.roomId).emit('offer', data); });
  socket.on('answer', (data) => { socket.to(data.roomId).emit('answer', data); });
  socket.on('ice-candidate', (data) => { socket.to(data.roomId).emit('ice-candidate', data); });
});
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log('Running'));
