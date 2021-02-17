import Commentary from '../models/Commentary';
import ICommentariesRepository from '../repositories/ICommentariesRepository';

class ListCommentariesService {
  constructor(private commentariesRepository: ICommentariesRepository) {}

  public async execute(): Promise<Commentary[]> {
    const commentaries = await this.commentariesRepository.findAll();

    return commentaries;
  }
}

export default ListCommentariesService;
