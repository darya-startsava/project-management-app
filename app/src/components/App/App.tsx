import React, { FC } from 'react';

import { CssBaseline } from '@mui/material';
import Header from '$components/Header';
import Main from '$components/Main';
import AppRoutes from '$components/AppRoutes';
import Footer from '$components/Footer';

import './App.scss';

const App: FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Main>
        <AppRoutes />
      </Main>
      <Footer />
    </React.Fragment>
  );
};

export default App;
