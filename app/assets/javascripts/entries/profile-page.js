import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../profilePage/redux/configureStore';
import RootPage from '../profilePage/components/rootPage';

import { Router, Route, IndexRoute } from 'react-router';
import Profile from '../profilePage/components/profileComponent'
import Addresses from '../profilePage/components/addressesComponent'

import history from '../profilePage/redux/history'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: blue
    },
});


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router history={history}>
                <Route path="/setting" component={RootPage}>
                    <IndexRoute component={Profile}/>
                    <Route path="/setting/profile" component={Profile} />
                    <Route path="/setting/addresses" component={Addresses} />

                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('profile-container')
);