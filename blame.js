const request = require('request');
const cheerio = require('cheerio');

module.exports = (input, cb) => {
  const m = input.match(/github.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.*)\+([0-9]+)/);
  const [_, owner, repo, commit, file, line] = m;
  const url = `https://github.com/${owner}/${repo}/blame/${commit}/${file}`;

  request.get(url, (err, resp, body) => {
    if (err) return cb(err);

    const $ = cheerio.load(body);
    const $td = $(`#L${line}`);
    const $hunk = $td.parents('.blame-hunk');
    const $commit = $hunk.find('.blame-commit');
    const author = $commit.find('a').attr('aria-label');
    const title = $commit.find('.blame-commit-title').text();
    const date = $commit.find('.blame-commit-date').find('time-ago').attr('datetime');

    return cb(null, {
      author,
      title,
      date,
    });
  });
};
