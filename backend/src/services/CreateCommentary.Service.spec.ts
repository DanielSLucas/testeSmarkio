import FakeTextToSpeachProvider from '../providers/fakes/FakeTextToSpeachProvider';
import FakeCommentariesRepository from '../repositories/fakes/FakeCommentariesRepository';
import CreateCommentaryService from './CreateCommentaryService';

describe('CreateCommentary', () => {
  it('should be able to create a new commentary', async () => {
    const fakeCommentariesRepository = new FakeCommentariesRepository();
    const fakeTextToSpeachProvider = new FakeTextToSpeachProvider();
    const createCommentary = new CreateCommentaryService(
      fakeCommentariesRepository,
      fakeTextToSpeachProvider,
    );

    const commentary = await createCommentary.execute(
      'Um texto para transformar em voz',
    );
    expect(commentary).toHaveProperty('id');
  });
});
