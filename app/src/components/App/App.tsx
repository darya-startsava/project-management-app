import React, { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import MuiTheme from '$components/MuiTheme/MuiTheme';
import AppRoutes from '$components/AppRoutes';
import Header from '$components/Header/Header';
import Main from '$components/Main';
import Footer from '$components/Footer';
import './App.scss';

const App: FC = () => {
  return (
    <MuiTheme>
      <React.Fragment>
        <SnackbarProvider maxSnack={5}>
          <CssBaseline />
          <Header />
          <Main>
            <AppRoutes />
          </Main>
          <Footer />
        </SnackbarProvider>
      </React.Fragment>
    </MuiTheme>
  );
};

export default App;
