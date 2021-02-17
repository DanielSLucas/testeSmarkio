import { Repository } from 'typeorm';
import fs from 'fs';
import path from 'path';

import { tmpFolder } from '../config';

import Commentary from '../models/Commentary';

class DeleteCommentaryService {
  constructor(private commentariesRepository: Repository<Commentary>) {}

  public async execute(commentary_id: string): Promise<void> {
    const commentary = await this.commentariesRepository.findOne({
      where: { id: commentary_id },
    });

    if (!commentary) {
      throw new Error("Commentary doesn't exist");
    }
    const audioFilePath = path.join(tmpFolder, commentary.file);

    await this.commentariesRepository.remove(commentary);
    fs.unlinkSync(audioFilePath);
  }
}

export default DeleteCommentaryService;
