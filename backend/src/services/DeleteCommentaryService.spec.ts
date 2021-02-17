import FakeTextToSpeachProvider from '../providers/fakes/FakeTextToSpeachProvider';
import FakeCommentariesRepository from '../repositories/fakes/FakeCommentariesRepository';
import CreateCommentaryService from './CreateCommentaryService';
import DeleteCommentaryService from './DeleteCommentaryService';
import ListCommentariesService from './ListCommentariesService';

let fakeCommentariesRepository: FakeCommentariesRepository;
let fakeTextToSpeachProvider: FakeTextToSpeachProvider;

let deleteCommentary: DeleteCommentaryService;

describe('DeleteCommentary', () => {
  beforeEach(() => {
    fakeCommentariesRepository = new FakeCommentariesRepository();
    fakeTextToSpeachProvider = new FakeTextToSpeachProvider();
    deleteCommentary = new DeleteCommentaryService(
      fakeCommentariesRepository,
      fakeTextToSpeachProvider,
    );
  });

  it('should be able to delete a commentary', async () => {
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

    await deleteCommentary.execute(commentary1.id);

    const commentaries = await listCommentaries.execute();
    expect(commentaries).toEqual([commentary2]);
  });

  it('should not be able to delete a nonexistent commentary', async () => {
    await expect(deleteCommentary.execute('nonexistent-commentary-id')).rejects;
  });
});
