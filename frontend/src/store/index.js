import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import session from './session';
import maps from './maps';

const rootReducer = combineReducers({
  session,
  maps,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  // Just thunking
  enhancer = applyMiddleware(thunk);
} else {
  // Thunk and logs
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
