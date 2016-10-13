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
const init = () => {
  const element = document.querySelector('#demo');

  element.addEventListener('error', onError);
  element.addEventListener('change', onChange);

  element.json = demoJson;
};

const onError = (e) => {
  console.log('onError', error);
};

const onChange = (e) => {
  const json = e.detail;

  console.log('onChange', json);
};

document.addEventListener('DOMContentLoaded', init);