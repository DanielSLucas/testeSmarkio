import { Repository } from 'typeorm';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import { ibmWatsonConfig, tmpFolder } from '../config';

import Commentary from '../models/Commentary';
import textToSpeech from '../providers/implementations/textToSpeachIBM';

class CreateCommentaryService {
  constructor(private commentariesRepository: Repository<Commentary>) {}

  public async execute(text: string): Promise<Commentary> {
    const hash = crypto.randomBytes(10).toString('hex');

    const synthesizeParams = {
      text,
      accept: ibmWatsonConfig.synthesizeParams.mimeType,
      voice: ibmWatsonConfig.synthesizeParams.voice,
    };

    const createAudio = await textToSpeech.synthesize(synthesizeParams);
    const audioFilePath = path.join(tmpFolder, `${hash}.mp3`);

    if (createAudio.result instanceof Buffer) {
      fs.writeFileSync(audioFilePath, createAudio.result);
    } else {
      createAudio.result.pipe(fs.createWriteStream(audioFilePath));
    }

    const commentary = await this.commentariesRepository.create({
      text,
      file: `${hash}.mp3`,
    });

    await this.commentariesRepository.save(commentary);

    return commentary;
  }
}

export default CreateCommentaryService;
