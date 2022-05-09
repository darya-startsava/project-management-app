import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './Welcome.module.scss';

const Welcome: FC = () => {
  return (
    <Section className={css.welcome} pageAllSpace={true}>
      <Typography variant="h1">Welcome page</Typography>
    </Section>
  );
};

export default Welcome;
