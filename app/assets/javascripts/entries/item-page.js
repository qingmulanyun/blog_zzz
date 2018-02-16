import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../itemPage/redux/reducers/rootReducers'
import ItemRootPage from '../itemPage/components/itemRootPage'
import thunk from 'redux-thunk'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';

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

let rootElement = document.getElementById('item-details-container');

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <ItemRootPage />
        </MuiThemeProvider>
    </Provider>,
    rootElement
)