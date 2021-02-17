import Commentary from '../models/Commentary';

export interface ICreateCommentaryDTO {
  text: string;
  file: string;
}

export default interface ICommentariesRepository {
  create(commentaryDTO: ICreateCommentaryDTO): Promise<Commentary>;
  findAll(): Promise<Commentary[]>;
  findById(commentary_id: string): Promise<Commentary | undefined>;
  delete(commentary: Commentary): Promise<void>;
}
