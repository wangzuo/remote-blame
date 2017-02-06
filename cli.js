#!/usr/bin/env node

const blame = require('./');
const input = process.argv[2];

blame(input, (err, info) => {
  console.log(JSON.stringify(info, 2, ' '));
});
