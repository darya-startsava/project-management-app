import React, { FC } from 'react';

import { Container, Grid } from '@mui/material';

import css from './Footer.module.scss';

const Footer: FC = () => {
  return (
    <footer className={css.footer}>
      <Container>
        <Grid container>
          <Grid item xs={4}>
            1 Repo
          </Grid>

          <Grid item xs={4}>
            2 Repo
          </Grid>

          <Grid item xs={4}>
            3 Repo
          </Grid>

          <Grid item xs={12}>
            2022
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
