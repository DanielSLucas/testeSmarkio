import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Commentary from '../models/Commentary';

import ListCommentariesService from '../services/ListCommentariesService';
import DeleteCommentaryService from '../services/DeleteCommentaryService';
import CreateCommentaryService from '../services/CreateCommentaryService';

export default class CommentariesController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const commentariesRepository = getRepository(Commentary);
      const listcommentaries = new ListCommentariesService(
        commentariesRepository,
      );

      const commentaries = await listcommentaries.execute();

      return response.json(commentaries);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { commentary_text } = request.body;

      const commentariesRepository = getRepository(Commentary);

      const createCommentary = new CreateCommentaryService(
        commentariesRepository,
      );

      const commentary = await createCommentary.execute(commentary_text);

      return response.json(commentary);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const commentariesRepository = getRepository(Commentary);

      const deletecommentary = new DeleteCommentaryService(
        commentariesRepository,
      );

      await deletecommentary.execute(id);

      return response.json({ message: 'Deleted!' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
