import React from 'react';
import ReactDOM from 'react-dom';
import Entry from './components/entry';
import Login from './components/login';
import UserApp from './components/user/user_app';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const routes = (
  <MuiThemeProvider>
    <Router history={browserHistory} >
      <Route path="/" component={Entry} />
      <Route path="/login" component={Login} />
      <Route path="/user/:userId" component={UserApp} />
    </Router>
  </MuiThemeProvider>
);

Meteor.startup(function(){
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
