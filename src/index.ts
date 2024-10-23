import express, { Request, Response } from 'express';
import { join } from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

app.get('/', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, 'static/index.html'));
});

io.on('connection', (socket) => {
  io.emit('chat message', '상대방과 연결되었습니다.');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(30000, () => {
  console.log(`Server is running at http://localhost:30000`);
});
