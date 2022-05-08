import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.scss';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../general/LanguageSwitch';
import Welcome from '../../pages/Welcome';

const App: FC = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <CssBaseline />
      <div>{t('app.start')}</div>
      <IconButton arial-label={t('app.IconBtnAriaLabel')}>
        <LoginIcon htmlColor="#000" />
      </IconButton>

      <LanguageSwitch />

      <Welcome />
    </React.Fragment>
  );
};

export default App;
