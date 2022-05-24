import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '$store/store';
import { StyledEngineProvider } from '@mui/material/styles';
import { AppBar, useScrollTrigger, Toolbar, Button, Grid, Typography } from '@mui/material';
import {
  Logout as LogoutIcon,
  Login as LoginIcon,
  AppRegistration as AppRegistrationIcon,
  ManageAccounts as ManageAccountsIcon,
  Home as HomeIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import LanguageToggler from '$components/LanguageToggler';
import { setToken, setLogin } from '$store/appSlice';
import { ROUTES_PATHS } from '$settings/routing';
import { TOKEN_AUTH_LOCALSTORAGE, LOGIN_NAME_LOCALSTORAGE } from '$settings/index';
import KanbanLogo from '$assets/kanban-logo.png';
import css from './Header.module.scss';
import './Header.scss';

const Header: FC = () => {
  const { token } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const trigger = useScrollTrigger();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(setToken(null));
    dispatch(setLogin(null));
    localStorage.removeItem(TOKEN_AUTH_LOCALSTORAGE);
    localStorage.removeItem(LOGIN_NAME_LOCALSTORAGE);
    navigate(ROUTES_PATHS.welcome, { replace: true });
  };

  return (
    <StyledEngineProvider injectFirst>
      <AppBar position="sticky" color={trigger ? 'primary' : 'inherit'} className={css.header}>
        <Toolbar>
          <Button href={ROUTES_PATHS.welcome}>
            <Typography className={css.header__heading} variant="h6" component="h1">
              Kanban
            </Typography>
            <img className={css.header__logo} src={KanbanLogo} alt={t('Header.logo')} />
          </Button>
          <Grid container spacing={0} direction="row" alignItems="center" justifyContent="end">
            {token ? (
              <>
                <Button href={ROUTES_PATHS.profile} startIcon={<ManageAccountsIcon />}>
                  {t('Header.editProfile')}
                </Button>
                <Button startIcon={<TableChartIcon />}>{t('Header.newBoard')}</Button>
                <Button
                  href={ROUTES_PATHS.welcome}
                  startIcon={<LogoutIcon />}
                  onClick={handleLogOut}
                >
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
            <LanguageToggler />
          </Grid>
        </Toolbar>
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Header;
