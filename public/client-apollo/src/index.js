import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'normalize.css';
import apolloClient from './apis/apolloClient';
import configureStore from './configureStore';
import App from './components/App';
import './index.css';

const store = configureStore();
ReactDOM.render(
  // eslint-disable-next-line
  <ApolloProvider store={store} client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
