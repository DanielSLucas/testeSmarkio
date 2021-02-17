import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import './database';

import CommentariesController from './controllers/CommentariesController';

const commentariesController = new CommentariesController();

const app = express();
const port = process.env.SERVER_PORT || 3333;

app.use(express.json());
app.use(cors());

app.post('/', commentariesController.create);
app.get('/', commentariesController.index);
app.delete('/:id', commentariesController.delete);

app.use(
  '/files',
  express.static('./tmp', {
    etag: false,
  }),
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta ${port}`);
});
