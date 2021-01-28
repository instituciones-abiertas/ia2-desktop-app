import React, { Fragment } from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/browser';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import { history, configuredStore } from './store';
import './app.global.css';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_RELEASE,
  debug: false,
});

const store = configuredStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line global-require
  const Root = require('./containers/Root').default;
  render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
  );
});
