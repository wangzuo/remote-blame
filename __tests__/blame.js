const blame = require('../');

test('github', () => {
  const url = 'github.com/facebook/draft-js/067fe5be8550dd0b7633d856d2376b04bebeab7f/src/model/decorators/DraftDecorator.js+40';
  blame(url, (err, info) => {
    expect(info).toEqual({
      author: 'nkt',
      title: 'Add DraftDecoratorStrategy type (#826)',
      date: '2017-01-28T18:11:01Z',
    });
  });
});
