export interface ISpeach {
  fileName: string;
  path: string;
}

export default interface ITextToSpeachProvider {
  textToSpeach(text: string): Promise<ISpeach>;
  deleteAudio(fileName: string): void;
}
