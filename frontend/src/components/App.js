import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';
import Dashboard from './management/Dashboard';
import Alerts from './layout/Alerts';
import PrivateRoute from './common/PrivateRoute';
import HomePage from './common/HomePage';
import QDashboard from './interactions/QDashboard'

import Login from './accounts/Login';
import Register from './accounts/Register';

import { Provider } from 'react-redux';

import store from '../store';

import { loadUser } from '../actions/auth';

const alertOptions = {
    timeout: 3000,
    position: 'top center'
    
}

class App extends Component {

    componentDidMount(){
        store.dispatch(loadUser());
    }
    render() {
        return (
            <Provider store={store}>
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container">
                                <Switch>
                                    <PrivateRoute exact path='/myAccount' component={Dashboard} />
                                    <Route exact path='/login' component={Login} />
                                    <Route exact path='/register' component={Register} />
                                    <Route exact path='/' render={(props) => <HomePage {...props} ansQs={false} />} />
                                    <Route exact path='/answerQs' render={(props) => <HomePage {...props} ansQs={true} />} />
                                    <Route exact path='/search/:search?' render={(props) => <HomePage {...props} />} />
                                    <Route exact path="/question/:id" render={(props) => <QDashboard {...props} />} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));