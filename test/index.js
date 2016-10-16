require('../src');

const test = require('ava');

test('Attached', t => {
  document.body.innerHTML = '<pre id="demo" is="edy-son"></pre>';
  t.pass();
});