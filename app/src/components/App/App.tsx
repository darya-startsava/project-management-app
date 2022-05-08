import React, { FC, useState } from 'react';

import { Button, CssBaseline } from '@mui/material';
import Main from '$components/Main';
import ErrorBoundary from '$components/ErrorBoundary';
import ComponentWithError from '$components/ComponentWithError';

import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import LanguageSwitch from '../general/LanguageSwitch';

import './App.scss';

const App: FC = () => {
  const { t } = useTranslation();
  const [showError, setShowError] = useState<boolean>(false);
  const [showError2, setShowError2] = useState<boolean>(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <div>Start task</div>

      <Button variant={'contained'} onClick={() => setShowError(true)}>
        Show component without error boundry
      </Button>
      <Button variant={'contained'} color={'secondary'} onClick={() => setShowError2(true)}>
        Show componetn with error boundry
      </Button>

      <Main>
        <>{showError ? <ComponentWithError showArror={true} /> : null}</>
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
      </Main>
    </React.Fragment>
  );
};

export default App;
