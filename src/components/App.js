// IMPORT EXTERNAL LIBRARIES/MODULES
import React from 'react';
import {Provider} from "react-redux";
import {createBrowserHistory} from 'history';
import {
    Router,
    Switch,
    Route
} from "react-router-dom";
// IMPORT API & ROUTE ACTIONS
import './../index.css';
import Dashboard from './Dashboard';
import LoginComponent from './LoginComponent';
import PrivateRoute from '../routes/PrivateRoute';
import store from '../redux/store';

export default function App() {
    const Notfound = () => <h1> 404 Not found</h1>
    const history = createBrowserHistory();
    return (
        <Provider store={store}>
            <Router basename="/" history={history}>
                <Switch>
                    <Route exact path="/" component={LoginComponent}/>
                    <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                    <Route path="*" component={Notfound}/>
                </Switch>
            </Router>
        </Provider>
    );
}