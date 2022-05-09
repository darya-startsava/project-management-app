import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './LogOut.module.scss';

const LogOut: FC = () => {
  return (
    <Section className={css.logout} pageAllSpace={true}>
      <Typography variant="h1">Logout page</Typography>
    </Section>
  );
};

export default LogOut;
