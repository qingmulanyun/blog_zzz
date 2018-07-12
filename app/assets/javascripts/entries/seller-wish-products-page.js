import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../sellerWishProductsPage/redux/reducers/rootReducers'
import WishProductsBoard from '../sellerWishProductsPage/components/wishProductsRootPage'
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
});

const store = createStore(totalReducer, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
)
);

let rootElement = document.getElementById('seller-wish-products-container');

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <WishProductsBoard />
        </MuiThemeProvider>
    </Provider>,
    rootElement
)