import { Lab12Page } from './app.po';

describe('lab12 App', () => {
  let page: Lab12Page;

  beforeEach(() => {
    page = new Lab12Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
