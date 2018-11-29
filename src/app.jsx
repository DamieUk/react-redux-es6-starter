import 'babel-polyfill';

import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { AppContainer } from "react-hot-loader";
import { theme } from "enums";
import Routes from './routes';
import store from './store';

const appTheme = createMuiTheme(theme);

const App = (props) => (
  <MuiThemeProvider theme={appTheme}>
    <Provider store={store}>
      {props.routes}
    </Provider>
  </MuiThemeProvider>
);

App.propTypes = {
  routes: PropTypes.node,
};

render(<App routes={<Routes />} />, document.querySelector('#app'));

if (module.hot) {
  module.hot.accept('./routes', () => {
    const NextRoute = require('./routes').default;
    render(
      <AppContainer>
        <App routes={<NextRoute />} />
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}