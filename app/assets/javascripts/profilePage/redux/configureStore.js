import { createStore, applyMiddleware, combineReducers, compose } from 'redux'

import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducers'
import profileReducer from './reducers/profileReducers'


const totalReducer = combineReducers({
    root: rootReducer,
    profile: profileReducer,
    routing: routerReducer
});

export function configureStore() {
  return createStore(
      totalReducer, compose(
          applyMiddleware(routerMiddleware(browserHistory),thunk),
          window.devToolsExtension ? window.devToolsExtension() : f => f
      )
  );
}

const store = configureStore();

export default store;
