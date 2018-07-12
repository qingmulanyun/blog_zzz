import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../salesReportPage/redux/reducers/rootReducers';
import ReportRootPage from '../salesReportPage/components/reportRootPage';
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
});

const store = createStore(totalReducer, compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
)
);

let rootElement = document.getElementById('sales-report-container');

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <ReportRootPage />
        </MuiThemeProvider>
    </Provider>,
    rootElement
)