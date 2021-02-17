import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import TextToSpeechV1 from 'ibm-watson/text-to-speech/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

import { ibmWatsonConfig, tmpFolder } from '../../config';
import ITextToSpeachProvider, { ISpeach } from '../ITextToSpeachProvider';

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: ibmWatsonConfig.apikey,
  }),
  url: ibmWatsonConfig.url,
});

export default class IBMTextToSpeachProvider implements ITextToSpeachProvider {
  public async textToSpeach(text: string): Promise<ISpeach> {
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

    return {
      fileName: `${hash}.mp3`,
      path: tmpFolder,
    };
  }

  public deleteAudio(fileName: string): void {
    const audioFilePath = path.join(tmpFolder, fileName);

    fs.unlinkSync(audioFilePath);
  }
}
