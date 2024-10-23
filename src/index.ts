import express, { Request, Response } from 'express';
import { join } from 'path';
import { Server } from 'socket.io';
import { createServer } from 'http';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function main() {
  const db = await open({
    filename: 'chat.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_offset TEXT UNIQUE,
        content TEXT
    );
  `);

  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    connectionStateRecovery: {},
  });

  app.get('/', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, 'static/index.html'));
  });

  io.on('connection', async (socket) => {
    io.emit('chat message', '상대방과 연결되었습니다.');
    socket.on('chat message', async (msg, clientOffset, callback) => {
      let result: any;
      try {
        result = await db.run(
          'INSERT INTO messages (content, client_offset) VALUES (?, ?)',
          msg,
          clientOffset,
        );
      } catch (e) {
        if (e.errno === 19) {
          callback();
        }
        return;
      }

      io.emit('chat message', msg, result.lastID);
      callback();
    });

    if (!socket.recovered) {
      try {
        await db.each(
          'SELECT id, content FROM messages WHERE id > ?',
          [socket.handshake.auth.serverOffset || 0],
          (_err, row) => {
            socket.emit('chat message', row.content, row.id);
          },
        );
      } catch (e) {}
    }
  });

  server.listen(30000, () => {
    console.log(`Server is running at http://localhost:30000`);
  });
}

main();