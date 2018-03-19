import { createStore, applyMiddleware, combineReducers } from 'redux'

import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducers'


const totalReducer = combineReducers({
    root: rootReducer,
    routing: routerReducer
});

export function configureStore() {
  return createStore(
      totalReducer,
    applyMiddleware(
      routerMiddleware(browserHistory),
      thunk
    )
  )
}

const store = configureStore();

export default store;
