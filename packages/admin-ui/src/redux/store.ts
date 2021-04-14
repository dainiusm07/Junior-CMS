import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';

const getEnhancers = () => {
  const enhancers: StoreEnhancer[] = [
    applyMiddleware(thunk),
    applyMiddleware(logger),
  ];

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return enhancers;
};

const store = createStore(reducers, compose(...getEnhancers()));

export default store;
