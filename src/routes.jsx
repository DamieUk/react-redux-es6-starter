import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { confirm } from 'elements';
import Main from 'pages/layout/Main';
import ApplicationContent from 'pages/layout/InnerApp';

const getUserConfirmation = (message, callback) => confirm(
  () => callback(true), {
    title: message,
    onRequestClose: () => callback(false),
  });

const Routes = () => (
  <Router getUserConfirmation={getUserConfirmation}>
    <div>
      <Route path="/" exact component={Main} />
      <Switch>
        <Route path="/" component={ApplicationContent} />
        <Redirect to="/" />
      </Switch>
    </div>

  </Router>
);

export default Routes;