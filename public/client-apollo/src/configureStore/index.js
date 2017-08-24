import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import apolloClient from '../apis/apolloClient';
import reducers from './reducers';

export default () => {
  const middlewares = [thunk, apolloClient.middleware()];
  return createStore(
    reducers,
    compose(
      applyMiddleware(...middlewares),
      process.env.NODE_ENV !== 'production' && window.devToolsExtension ?
        window.devToolsExtension() : f => f,
    ),
  );
};
