import React from 'react';
import ReactDOM from 'react-dom';

import { GlobalStateProvider } from './providers/global-state-provider';
import App from './components/app/app';

ReactDOM.render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
  document.getElementById('root'),
);
