/**
 * TODO: Reflect if has errors -> handle initialValue event
 * TODO: Save changes
 */

require('edyson');

let edyson, errorStatus;

const init = () => {
  edyson = document.getElementById('config');
  errorStatus = document.getElementById('error-status');

  document.getElementById('editable').addEventListener('change', onEditChange);
  document.getElementById('indentation').addEventListener('change', onIndentation);
  document.getElementById('indentation').addEventListener('keyup', onIndentation);
  document.getElementById('save').addEventListener('click', onSaveChanges);

  edyson.addEventListener('error', onError);
  edyson.addEventListener('initialValue', onInitialValue);
  edyson.addEventListener('change', onChange);

  edyson.json = jsonConfig;
};

const onSaveChanges = () => {
  edyson.save();
};

const onIndentation = function() {
  edyson.indentation = this.value;
};

const onInitialValue = () => {
  errorStatus.textContent = '✅';
};

const onEditChange = function() {
  edyson.editable = this.checked;
};

const onError = (e) => {
  errorStatus.textContent = '❌';
};

const onChange = (e) => {
  const json = e.detail;

  errorStatus.textContent = '✅';
  console.log('onChange', json);
};

document.addEventListener('DOMContentLoaded', init);