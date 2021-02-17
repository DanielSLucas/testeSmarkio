import { v4 } from 'uuid';

import ICommentariesRepository, {
  ICreateCommentaryDTO,
} from '../ICommentariesRepository';

import Commentary from '../../models/Commentary';

class FakeCommentariesRepository implements ICommentariesRepository {
  private commentaries: Commentary[] = [];

  public async findById(id: string): Promise<Commentary | undefined> {
    const findCommentary = this.commentaries.find(
      commentary => commentary.id === id,
    );

    return findCommentary;
  }

  public async findAll(): Promise<Commentary[]> {
    return this.commentaries;
  }

  public async create(
    commentaryDTO: ICreateCommentaryDTO,
  ): Promise<Commentary> {
    const commentary = new Commentary();

    Object.assign(commentary, {
      id: v4(),
      ...commentaryDTO,
    });

    this.commentaries.push(commentary);

    return commentary;
  }

  public async delete(commentary: Commentary): Promise<void> {
    const commentaryIndex = this.commentaries.findIndex(
      item => item.id === commentary.id,
    );

    this.commentaries.splice(commentaryIndex, 1);
  }
}

export default FakeCommentariesRepository;
