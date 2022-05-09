import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './Registration.module.scss';

const Registration: FC = () => {
  return (
    <Section className={css.registration} pageAllSpace={true}>
      <Typography variant="h1">Registration page</Typography>
    </Section>
  );
};

export default Registration;
