import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '$store/store';

import Navigation from '$components/Navigation';
import { AppBar, Container, FormControlLabel, Grid, Switch } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LanguageIcon from '@mui/icons-material/Language';

import { changeAuthorizationAction, changeLanguageAction } from '$store/appSlice';
import { LOCALIZES_TEXT } from '$settings/routing';

import css from './Header.module.scss';

const Header: FC = () => {
  const { isEnglishLang, isAuthorizationUser } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const showLogUserText = (): string => {
    if (isAuthorizationUser) {
      return isEnglishLang ? LOCALIZES_TEXT.logout.en : LOCALIZES_TEXT.logout.ru;
    }
    return isEnglishLang ? LOCALIZES_TEXT.login.en : LOCALIZES_TEXT.login.ru;
  };
  return (
    <AppBar classes={css.header} color="default" position="static">
      <Container>
        <Grid container>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <>
                  <Switch
                    checked={isAuthorizationUser}
                    onClick={() => {
                      dispatch(changeAuthorizationAction(!isAuthorizationUser));
                    }}
                  />
                  {isAuthorizationUser ? (
                    <LogoutIcon htmlColor="#000" />
                  ) : (
                    <LoginIcon htmlColor="#000" />
                  )}
                </>
              }
              label={showLogUserText()}
            />
          </Grid>

          <Grid item xs={2}>
            <FormControlLabel
              control={
                <>
                  <Switch
                    checked={isEnglishLang}
                    onClick={() => {
                      dispatch(changeLanguageAction(!isEnglishLang));
                    }}
                  />
                  <LanguageIcon htmlColor="#000" />
                </>
              }
              label={isEnglishLang ? LOCALIZES_TEXT.language.en : LOCALIZES_TEXT.language.ru}
            />
          </Grid>

          <Grid item xs={8}>
            <Navigation />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};

export default Header;
