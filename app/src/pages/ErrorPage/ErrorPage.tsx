import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './ErrorPage.module.scss';

interface ILocationState {
  errorText: string;
}

const ErrorPage: FC = () => {
  const { state } = useLocation();
  const { errorText } = state as ILocationState;

  return (
    <Section className={css.error_page} pageAllSpace={true}>
      <Typography variant="h1">Error page</Typography>

      <p>{errorText}</p>
    </Section>
  );
};

export default ErrorPage;
