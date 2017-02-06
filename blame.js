const request = require('request');
const cheerio = require('cheerio');

module.exports = (repo, line, cb) => {
  // const url = `https://github.com/wangzuo/zhibo/blame/master/cli.js`;

  request.get(repo, (err, resp, body) => {
    if (err) return cb(err);

    const $ = cheerio.load(body);
    const $td = $(`#L${line}`);
    const $hunk = $td.parents('.blame-hunk');
    const $commit = $hunk.find('.blame-commit');
    const author = $commit.find('a').attr('aria-label');
    const commit = $commit.find('.blame-commit-title').text();
    const date = $commit.find('.blame-commit-date').find('time-ago').attr('datetime');

    return cb(null, { 
      author,
      commit,
      date,
    });
  });
};
