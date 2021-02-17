import crypto from 'crypto';
import ITextToSpeachProvider, { ISpeach } from '../ITextToSpeachProvider';

interface AudioFile {
  fileName: string;
  text: string;
  path: string;
}

export default class FakeTextToSpeachProvider implements ITextToSpeachProvider {
  private audioFiles: AudioFile[] = [];

  public async textToSpeach(text: string): Promise<ISpeach> {
    const hash = crypto.randomBytes(10).toString('hex');

    this.audioFiles.push({
      text,
      fileName: `${hash}.mp3`,
      path: `./${hash}.mp3`,
    });

    return {
      fileName: `${hash}.mp3`,
      path: `./${hash}.mp3`,
    };
  }

  public deleteAudio(fileName: string): void {
    const findIndex = this.audioFiles.findIndex(
      storageFile => storageFile.fileName === fileName,
    );

    this.audioFiles.splice(findIndex, 1);
  }
}
