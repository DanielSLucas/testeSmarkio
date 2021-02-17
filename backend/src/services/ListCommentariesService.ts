import { Repository } from 'typeorm';
import Commentary from '../models/Commentary';

class ListCommentariesService {
  constructor(private commentariesRepository: Repository<Commentary>) {}

  public async execute(): Promise<Commentary[]> {
    const commentaries = await this.commentariesRepository.find({
      order: { created_at: 'DESC' },
      take: 3,
    });

    return commentaries;
  }
}

export default ListCommentariesService;
