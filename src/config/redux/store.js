import { createLogger } from 'redux-logger'; //eslint-disable-line

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const log = createLogger({ collapsed: true });
const middlewares = [thunk, log];
// create store
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancers = composeEnhancers(applyMiddleware(...middlewares));
const store = createStore(reducer, enhancers);
export default store;
