/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import AnonimizationPage from './containers/AnonimizationPage';
import LoginPage from './containers/LoginPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path={routes.LOGIN} component={LoginPage} />
        <Route
          exact
          path={routes.ANONIMIZATION}
          component={AnonimizationPage}
        />
      </Switch>
    </App>
  );
}
