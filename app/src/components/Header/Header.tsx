import { FC } from 'react';

import { AppBar, useScrollTrigger, Toolbar, Button, Grid, Typography } from '@mui/material';
import LanguageToggler from '$components/general/LanguageToggler';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import { useAppSelector } from '$store/store';
import { ROUTES_PATHS } from '$settings/routing';
import css from './Header.module.scss';
import './Header.scss';
import KanbanLogo from '$assets/kanban-logo.png';
import { StyledEngineProvider } from '@mui/material/styles';

const Header: FC = () => {
  const { token } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const trigger = useScrollTrigger();

  return (
    <StyledEngineProvider injectFirst>
      <AppBar position="sticky" color={trigger ? 'primary' : 'inherit'}>
        <Toolbar>
          <Button href={ROUTES_PATHS.welcome}>
            <Typography className={css.header__heading} variant="h6" component="h1">
              Kanban
            </Typography>
            <img className={css.header__logo} src={KanbanLogo} alt={t('Header.logo')} />
          </Button>
          <Grid container spacing={0} direction="row" alignItems="center" justifyContent="end">
            <LanguageToggler />
            {token ? (
              <>
                <Button href={ROUTES_PATHS.profile} startIcon={<ManageAccountsIcon />}>
                  {t('Header.editProfile')}
                </Button>
                <Button startIcon={<TableChartIcon />}>{t('Header.newBoard')}</Button>
                <Button href={ROUTES_PATHS.logout} startIcon={<LogoutIcon />}>
                  {t('Header.signOut')}
                </Button>
                <Button href={ROUTES_PATHS.boards} startIcon={<HomeIcon />}>
                  {t('Header.goToMainPage')}
                </Button>
              </>
            ) : (
              <>
                <Button href={ROUTES_PATHS.login} startIcon={<LoginIcon />}>
                  {t('Header.signIn')}
                </Button>
                <Button href={ROUTES_PATHS.registration} startIcon={<AppRegistrationIcon />}>
                  {t('Header.signUp')}
                </Button>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Header;
