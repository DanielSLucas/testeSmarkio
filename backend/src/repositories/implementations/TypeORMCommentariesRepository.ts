import { EntityRepository, getRepository, Repository } from 'typeorm';
import ICommentariesRepository, {
  ICreateCommentaryDTO,
} from '../ICommentariesRepository';

import Commentary from '../../models/Commentary';

@EntityRepository(Commentary)
class TypeORMCommentariesRepository implements ICommentariesRepository {
  private ormRepository: Repository<Commentary>;

  constructor() {
    this.ormRepository = getRepository(Commentary);
  }

  public async findById(
    commentary_id: string,
  ): Promise<Commentary | undefined> {
    const commentary = await this.ormRepository.findOne({
      where: { id: commentary_id },
    });

    return commentary;
  }

  public async findAll(): Promise<Commentary[]> {
    const commentaries = await this.ormRepository.find({
      order: { created_at: 'DESC' },
      take: 3,
    });

    return commentaries;
  }

  public async create({
    text,
    file,
  }: ICreateCommentaryDTO): Promise<Commentary> {
    const commentary = await this.ormRepository.create({
      text,
      file,
    });

    await this.ormRepository.save(commentary);

    return commentary;
  }

  public async delete(commentary: Commentary): Promise<void> {
    await this.ormRepository.remove(commentary);
  }
}

export default TypeORMCommentariesRepository;
