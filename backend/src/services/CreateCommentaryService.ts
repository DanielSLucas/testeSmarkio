import { Repository } from 'typeorm';

import Commentary from '../models/Commentary';
import ITextToSpeachProvider from '../providers/ITextToSpeachProvider';

class CreateCommentaryService {
  constructor(
    private commentariesRepository: Repository<Commentary>,
    private textToSpeachProvider: ITextToSpeachProvider,
  ) {}

  public async execute(text: string): Promise<Commentary> {
    const { fileName } = await this.textToSpeachProvider.textToSpeach(text);

    const commentary = await this.commentariesRepository.create({
      text,
      file: fileName,
    });

    await this.commentariesRepository.save(commentary);

    return commentary;
  }
}

export default CreateCommentaryService;
