import React from 'react';
import ReactDOM from 'react-dom';

import Form from './components/Form';
import Contributing from './components/Contributing';

const elements = document.getElementsByClassName('App');

const components = {
  Form: <Form />,
  Contributing: <Contributing />
};

(() => {
  for (let i = 0; i <= elements.length; i++) {
    if (!elements[i]) return null;

    const currentComponent = Object.keys(components).find(
      (component) => component === elements[i].id
    );

    ReactDOM.render(
      components[currentComponent],
      document.getElementById(currentComponent)
    );
  }
})();
