import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';

import css from './Home.module.scss';

const Home: FC = () => {
  return (
    <Section className={css.home}>
      <Typography variant="h1">Home page</Typography>
    </Section>
  );
};

export default Home;
