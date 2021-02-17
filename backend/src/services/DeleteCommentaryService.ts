import ITextToSpeachProvider from '../providers/ITextToSpeachProvider';
import ICommentariesRepository from '../repositories/ICommentariesRepository';

class DeleteCommentaryService {
  constructor(
    private commentariesRepository: ICommentariesRepository,

    private textToSpeachProvider: ITextToSpeachProvider,
  ) {}

  public async execute(commentary_id: string): Promise<void> {
    const commentary = await this.commentariesRepository.findById(
      commentary_id,
    );

    if (!commentary) {
      throw new Error("Commentary doesn't exist");
    }

    await this.commentariesRepository.delete(commentary);

    this.textToSpeachProvider.deleteAudio(commentary.file);
  }
}

export default DeleteCommentaryService;
