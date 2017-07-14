import { FinalExerciseReviewPage } from './app.po';

describe('final-exercise-review App', () => {
  let page: FinalExerciseReviewPage;

  beforeEach(() => {
    page = new FinalExerciseReviewPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
