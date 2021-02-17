import { Repository } from 'typeorm';

import Commentary from '../models/Commentary';
import ITextToSpeachProvider from '../providers/ITextToSpeachProvider';

class DeleteCommentaryService {
  constructor(
    private commentariesRepository: Repository<Commentary>,

    private textToSpeachProvider: ITextToSpeachProvider,
  ) {}

  public async execute(commentary_id: string): Promise<void> {
    const commentary = await this.commentariesRepository.findOne({
      where: { id: commentary_id },
    });

    if (!commentary) {
      throw new Error("Commentary doesn't exist");
    }

    await this.commentariesRepository.remove(commentary);

    this.textToSpeachProvider.deleteAudio(commentary.file);
  }
}

export default DeleteCommentaryService;
