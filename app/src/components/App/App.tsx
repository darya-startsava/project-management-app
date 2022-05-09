import React, { FC } from 'react';

import { CssBaseline } from '@mui/material';
import Header from '$components/Header';
import Main from '$components/Main';
import AppRoutes from '$components/AppRoutes';
import Footer from '$components/Footer';

import './App.scss';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../general/LanguageSwitch';
import Welcome from '../../pages/Welcome';

const App: FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />

      <Header />

      <Main>
        <AppRoutes />
      </Main>

      <Welcome />
      <Footer />
    </React.Fragment>
  );
};

export default App;
