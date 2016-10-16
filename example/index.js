require('../src');

const demoJson = {
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
let edyson;

const init = () => {
  edyson = document.querySelector('#demo');

  edyson.addEventListener('error', onError);
  edyson.addEventListener('change', onChange);
  document.getElementById('change-indentation').addEventListener('click', onIndentationChange);
  document.getElementById('save').addEventListener('click', onSave);
  edyson.json = demoJson;
};

const onSave = () => {
  edyson.save();
};

const onIndentationChange = () => {
  edyson.indentation = 4;
};

const onError = (e) => {
  console.log('onError', e);
};

const onChange = (e) => {
  const json = e.detail;

  console.log('onChange', json);
};

document.addEventListener('DOMContentLoaded', init);