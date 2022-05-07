import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './ErrorPage.module.scss';

const ErrorPage: FC = () => {
  return (
    <Section className={css.error_page} pageAllSpace={true}>
      <Typography variant="h1">404 page</Typography>
    </Section>
  );
};

export default ErrorPage;
