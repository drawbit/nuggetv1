import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as getAuth } from './redux/modules/auth';
import {
    App,
    CreateTest,
    Home,
    Alltests,
    TakeTest,
    Login,
    NotFound,
    Dashboard, 
    ChooseTest
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(getAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="createtest" component={CreateTest}/>
      </Route>
      <Route path="taketest/:testid" component={TakeTest}/>

      { /* Routes */ }
      <Route path="register(/:islogin)" component={Login}/>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="choosetest" component={ChooseTest}/>
      <Route path="alltests" component={Alltests}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
