import { Lab14Page } from './app.po';

describe('lab14 App', () => {
  let page: Lab14Page;

  beforeEach(() => {
    page = new Lab14Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
