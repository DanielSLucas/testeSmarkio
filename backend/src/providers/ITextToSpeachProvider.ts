export default interface ITextToSpeachProvider {
  textToSpeach(text: string): Promise<string>;
  deleteAudio(fileName: string): Promise<void>;
}
