const test = require('tape');
const removeSpaces = require('./helpers').removeSpaces;

require('../src');

const json = {
  user: {
    name: 'hector',
    lastName: 'zarco'
  },
  location: {
    country: {
      name: 'Spain',
      city: 'Valencia'
    }
  }
};

test('Renders the json content inside a "pre" element', t => {
  document.body.innerHTML = '<pre id="demo" is="edy-son"></pre>';
  const edyson = document.querySelector('#demo');

  edyson.json = json;
  t.equal(removeSpaces(edyson.textContent), JSON.stringify(json));
  t.end();
});

test.onFinish(() => {
  window.close();
});