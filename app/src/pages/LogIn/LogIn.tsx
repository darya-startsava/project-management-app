import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './LogIn.module.scss';

const LogIn: FC = () => {
  return (
    <Section className={css.login} pageAllSpace={true}>
      <Typography variant="h1">Login page</Typography>
    </Section>
  );
};

export default LogIn;
