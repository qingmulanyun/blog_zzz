import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../cartPage/redux/reducers/rootReducers';
import { gridReducer } from '../cartPage/redux/reducers/gridReducers';
import addressReducer from '../cartPage/redux/reducers/addressesReducers'
import CartRootPage from '../cartPage/components/cartRootPage';
import thunk from 'redux-thunk';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
});

const totalReducer = combineReducers({
    root: rootReducer,
    grid: gridReducer,
    address: addressReducer
});

const store = createStore(totalReducer, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
)
);

let rootElement = document.getElementById('my-cart-items-container');

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <CartRootPage />
        </MuiThemeProvider>
    </Provider>,
    rootElement
)