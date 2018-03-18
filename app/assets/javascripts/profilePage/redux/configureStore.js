import { createStore, applyMiddleware, combineReducers } from 'redux'

import { routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';



const rootReducer = combineReducers({
   routing: routerReducer
});

export function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      routerMiddleware(browserHistory),
      thunk
    )
  )
}

const store = configureStore();

export default store;
