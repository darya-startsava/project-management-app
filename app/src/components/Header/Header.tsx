import React, { FC } from 'react';
import { useAppSelector } from '$store/store';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Container, Grid, IconButton } from '@mui/material';
import Navigation from '$components/Navigation';
import LanguageSwitch from '$components/general/LanguageSwitch';
import css from './Header.module.scss';
import { useTranslation } from 'react-i18next';

const Header: FC = () => {
  const { token } = useAppSelector((state) => state.app);
  const { t } = useTranslation();

  return (
    <AppBar classes={css.header} color="default" position="static">
      <Container>
        <IconButton arial-label={t('app.IconBtnAriaLabel')}>
          {token ? <LogoutIcon htmlColor="#000" /> : <LoginIcon htmlColor="#000" />}
        </IconButton>

        <LanguageSwitch />

        <Grid container>
          <Grid item xs={8}>
            <Navigation />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;
