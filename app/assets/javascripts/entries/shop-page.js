import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../shop/redux/reducers/rootReducers'
import ShopHomeBoard from '../shop/components/home'
import thunk from 'redux-thunk'

const totalReducer = combineReducers({
    root: rootReducer,
});

const store = createStore(totalReducer, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
)
);

let rootElement = document.getElementById('my-shop-container');

render(
    <Provider store={store}>
        <ShopHomeBoard />
    </Provider>,
    rootElement
)