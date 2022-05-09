import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
  return (
    <Section className={css.error_page} pageAllSpace={true}>
      <Typography variant="h1">Not found page page</Typography>
    </Section>
  );
};

export default NotFoundPage;
