import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../homePage/redux/reducers/rootReducers'
import HomePageBoard from '../homePage/components/home'
import thunk from 'redux-thunk'

const totalReducer = combineReducers({
    root: rootReducer,
});

const store = createStore(totalReducer, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
)
);

let rootElement = document.getElementById('home-page-container');

render(
    <Provider store={store}>
        <HomePageBoard />
    </Provider>,
    rootElement
)