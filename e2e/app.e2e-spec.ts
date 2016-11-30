import { WebProjectPage } from './app.po';

describe('web-project App', function() {
  let page: WebProjectPage;

  beforeEach(() => {
    page = new WebProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
