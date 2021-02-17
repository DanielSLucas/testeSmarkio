import Commentary from '../models/Commentary';

import ITextToSpeachProvider from '../providers/ITextToSpeachProvider';
import ICommentariesRepository from '../repositories/ICommentariesRepository';

class CreateCommentaryService {
  constructor(
    private commentariesRepository: ICommentariesRepository,
    private textToSpeachProvider: ITextToSpeachProvider,
  ) {}

  public async execute(text: string): Promise<Commentary> {
    const { fileName } = await this.textToSpeachProvider.textToSpeach(text);

    const commentary = await this.commentariesRepository.create({
      text,
      file: fileName,
    });

    return commentary;
  }
}

export default CreateCommentaryService;
