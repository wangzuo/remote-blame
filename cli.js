#!/usr/bin/env node

const blame = require('./');
const repo = process.argv[2];
const line = process.argv[3];

blame(repo, line, (err, info) => {
  console.log(JSON.stringify(info, 2, ' '));
});
