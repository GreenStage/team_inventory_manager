import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DefaultPage from './containers/defaultPage';
import './App.scss';
import { restoreSession } from './actions';
import LoggedInPage from './containers/loggedInPage';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    text: {
      primary: '#424851',
      secondary: '#a4abb4',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      color: '#424851',
    },
    h5: {
      color: '#a4abb4',
    },
  },
});

export default function App() {
  const session = useSelector((state) => state.session);
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (session && session.token && status === 'IDLE') {
      // restore session data
      dispatch(restoreSession(session));
    }
  });

  function decideRender() {
    switch (status) {
      case 'SESSION_LOADED': return <LoggedInPage />;
      case 'IDLE':
        return <DefaultPage />;
      default:
        return (
          <div className="d-flex justify-content-center">
            <div className="spinner-grow text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container justify="center" alignItems="flex-start" style={{ height: '100%' }}>
        {decideRender()}
      </Grid>
    </ThemeProvider>
  );
}
