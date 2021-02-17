import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import './database';

import CommentariesController from './controllers/CommentariesController';

const app = express();
const commentariesController = new CommentariesController();

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

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3333');
});
