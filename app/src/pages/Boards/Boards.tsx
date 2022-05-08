import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Grid, Typography } from '@mui/material';
import Section from '$components/Section';

import { ROUTES_PATHS } from '$settings/routing';
import css from './Boards.module.scss';

const Boards: FC = () => {
  return (
    <Section className={css.boards} pageAllSpace={true}>
      <Typography variant="h1">Boards page</Typography>

      <Grid container>
        <Grid item xs={4}>
          <Link to={`${ROUTES_PATHS.boards}/1`}>Board 1 </Link>
        </Grid>

        <Grid item xs={4}>
          <Link to={`${ROUTES_PATHS.boards}/2`}>Board 2 </Link>
        </Grid>

        <Grid item xs={4}>
          <Link to={`${ROUTES_PATHS.boards}/3`}>Board 3 </Link>
        </Grid>
      </Grid>
    </Section>
  );
};

export default Boards;
