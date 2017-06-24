import { LatestAngularProjectPage } from './app.po';

describe('latest-angular-project App', () => {
  let page: LatestAngularProjectPage;

  beforeEach(() => {
    page = new LatestAngularProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
