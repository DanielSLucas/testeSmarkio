import FakeTextToSpeachProvider from '../providers/fakes/FakeTextToSpeachProvider';
import FakeCommentariesRepository from '../repositories/fakes/FakeCommentariesRepository';
import CreateCommentaryService from './CreateCommentaryService';
import ListCommentariesService from './ListCommentariesService';

describe('ListCommentaries', () => {
  it('should be able to list all commentaries', async () => {
    const fakeCommentariesRepository = new FakeCommentariesRepository();
    const fakeTextToSpeachProvider = new FakeTextToSpeachProvider();
    const createCommentary = new CreateCommentaryService(
      fakeCommentariesRepository,
      fakeTextToSpeachProvider,
    );
    const listCommentaries = new ListCommentariesService(
      fakeCommentariesRepository,
    );

    const commentary1 = await createCommentary.execute(
      'Um texto para transformar em voz',
    );

    const commentary2 = await createCommentary.execute(
      'Um texto para transformar em voz',
    );

    const commentaries = await listCommentaries.execute();
    expect(commentaries).toEqual([commentary1, commentary2]);
  });
});
