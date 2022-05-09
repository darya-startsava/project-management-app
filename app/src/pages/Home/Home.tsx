import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Typography } from '@mui/material';
import Section from '$components/Section';
import ComponentWithError from '$components/ComponentWithError';
import ErrorBoundary from '$components/ErrorBoundary';

import css from './Home.module.scss';

const Home: FC = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [showError2, setShowError2] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <Section className={css.home}>
      <Typography variant="h1">Home page</Typography>
      <Button variant={'contained'} onClick={() => setShowError(true)}>
        Show component without error boundary
      </Button>
      <Button variant={'contained'} color={'secondary'} onClick={() => setShowError2(true)}>
        Show component with error boundary
      </Button>

      <>{showError ? <ComponentWithError /> : null}</>
      <>
        {showError2 ? (
          <ErrorBoundary>
            <ComponentWithError />
          </ErrorBoundary>
        ) : null}

        <div>{t('app.start')}</div>

        <div>
          <h2>{t('app.welcome')}</h2>
          <span>{t('app.welcomeText')}</span>
        </div>
      </>
    </Section>
  );
};

export default Home;
