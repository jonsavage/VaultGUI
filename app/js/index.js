import React from 'react';
import ReactDOM from 'react-dom';

import Page from './lib/containers/Page';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  (
  <MuiThemeProvider>
    <Page />
  </MuiThemeProvider>),
  document.getElementById('root')
);
