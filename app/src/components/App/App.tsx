import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, CssBaseline } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import Header from '$components/Header';
import Main from '$components/Main';
import AppRoutes from '$components/AppRoutes';
import Footer from '$components/Footer';
import ErrorBoundary from '$components/ErrorBoundary';
import ComponentWithError from '$components/ComponentWithError';

import LanguageSwitch from '$components/general/LanguageSwitch';
import './App.scss';

const App: FC = () => {
  const { t } = useTranslation();
  const [showError, setShowError] = useState<boolean>(false);
  const [showError2, setShowError2] = useState<boolean>(false);
  return (
    <React.Fragment>
      <CssBaseline />

      <Button variant={'contained'} onClick={() => setShowError(true)}>
        Show component without error boundary
      </Button>
      <Button variant={'contained'} color={'secondary'} onClick={() => setShowError2(true)}>
        Show component with error boundary
      </Button>
      <>{showError ? <ComponentWithError showArrow={true} /> : null}</>
      <>
        {showError2 ? (
          <ErrorBoundary>
            <ComponentWithError />
          </ErrorBoundary>
        ) : null}
      </>
      <span>Text</span>

      <div>{t('app.start')}</div>
      <IconButton arial-label={t('app.IconBtnAriaLabel')}>
        <LoginIcon htmlColor="#000" />
      </IconButton>

      <LanguageSwitch />

      <div>
        <h2>{t('app.welcome')}</h2>
        <span>{t('app.welcomeText')}</span>
      </div>

      <Header />

      <Main>
        <AppRoutes />
      </Main>

      <Footer />
    </React.Fragment>
  );
};

export default App;
