import { Lab11Page } from './app.po';

describe('lab11 App', () => {
  let page: Lab11Page;

  beforeEach(() => {
    page = new Lab11Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
