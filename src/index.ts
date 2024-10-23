import express, { Request, Response } from 'express';
import { join } from 'path';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.sendFile(join(__dirname, 'static/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
