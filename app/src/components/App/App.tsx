import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.scss';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../general/LanguageSwitch';

const App: FC = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <CssBaseline />
      <div>{t('app.start')}</div>
      <IconButton arial-label="login">
        <LoginIcon htmlColor="#000" />
      </IconButton>

      <LanguageSwitch />

      <div>
        <h2>{t('app.welcome')}</h2>
        <span>{t('app.welcomeText')}</span>
      </div>
    </React.Fragment>
  );
};

export default App;
