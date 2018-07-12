import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../myShop/redux/reducers/rootReducers'
import { gridReducer } from '../myShop/redux/reducers/gridReducers'
import ShopHomeBoard from '../myShop/components/home'
import thunk from 'redux-thunk'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
});

const totalReducer = combineReducers({
    root: rootReducer,
    grid: gridReducer
});

const store = createStore(totalReducer, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
)
);

let rootElement = document.getElementById('my-shop-container');

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <ShopHomeBoard />
        </MuiThemeProvider>
    </Provider>,
    rootElement
)