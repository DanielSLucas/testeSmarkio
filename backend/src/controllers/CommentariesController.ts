import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Commentary from '../models/Commentary';
import IBMTextToSpeachProvider from '../providers/implementations/IBMTextToSpeachProvider';

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

      return response.send(commentaries);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { commentary_text } = request.body;

      const commentariesRepository = getRepository(Commentary);
      const ibmTextToSpeachProvider = new IBMTextToSpeachProvider();

      const createCommentary = new CreateCommentaryService(
        commentariesRepository,
        ibmTextToSpeachProvider,
      );

      const commentary = await createCommentary.execute(commentary_text);

      return response.send(commentary);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const commentariesRepository = getRepository(Commentary);
      const ibmTextToSpeachProvider = new IBMTextToSpeachProvider();

      const deletecommentary = new DeleteCommentaryService(
        commentariesRepository,
        ibmTextToSpeachProvider,
      );

      await deletecommentary.execute(id);

      return response.send({ message: 'Deleted!' });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
