import React from 'react';
import ReactDOM from 'react-dom';
import Entry from './components/entry';
import Login from './components/login';
import ShopAppContainer from './components/shop/shop_app_container';
import OrderApp from './components/shop/order/order_app';
import MenuAppContainer from './components/shop/menu/menu_app_container';
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
      <Route path="/shop/:userId" component={ShopAppContainer} >
        <Route path='/shop/:userId/order' component={OrderApp} />
        <Route path='/shop/:userId/menu' component={MenuAppContainer} />
      </Route>
    </Router>
  </MuiThemeProvider>
);

Meteor.startup(function(){
  ReactDOM.render(routes, document.querySelector('.render-target'));
});
