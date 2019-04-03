import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'; //eslint-disable-line

import reducer from './reducer';

const log = createLogger({ diff: true, collapsed: true });

const middlewares = [thunk, log];

const enhancers = [];

// create store
const store = createStore(
  reducer,
  {},
  compose(
    applyMiddleware(...middlewares),
    ...enhancers
  )
);
export default store;
