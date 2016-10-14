/**
 * TODO: Reflect if has errors
 * TODO: Reflect 'editable'
 */

require('edyson');

const init = () => {
  const element = document.querySelector('#config');

  element.addEventListener('error', onError);
  element.addEventListener('change', onChange);

  element.json = jsonConfig;
};

const onError = (e) => {
  console.log('onError', e);
};

const onChange = (e) => {
  const json = e.detail;

  console.log('onChange', json);
};

document.addEventListener('DOMContentLoaded', init);