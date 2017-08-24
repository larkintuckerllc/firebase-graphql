import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css';
import configureStore from './configureStore';
import App from './components/App';
import './index.css';

const store = configureStore();
ReactDOM.render(
  // eslint-disable-next-line
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
