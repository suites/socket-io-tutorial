import express, { Request, Response } from 'express';
import { join } from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, 'static/index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

server.listen(30000, () => {
  console.log(`Server is running at http://localhost:30000`);
});
