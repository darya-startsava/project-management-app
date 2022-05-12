import React, { FC } from 'react';
import { CssBaseline } from '@mui/material';
import Header from '$components/Header';
import Main from '$components/Main';
import AppRoutes from '$components/AppRoutes';
import Footer from '$components/Footer';
import './App.scss';
import MuiTheme from '$components/MuiTheme/MuiTheme';

const App: FC = () => {
  return (
    <MuiTheme>
      <React.Fragment>
        <CssBaseline />
        <Header />
        <Main>
          <AppRoutes />
        </Main>
        <Footer />
      </React.Fragment>
    </MuiTheme>
  );
};

export default App;
