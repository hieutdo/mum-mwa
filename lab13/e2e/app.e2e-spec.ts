import { Lab13Page } from './app.po';

describe('lab13 App', () => {
  let page: Lab13Page;

  beforeEach(() => {
    page = new Lab13Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
