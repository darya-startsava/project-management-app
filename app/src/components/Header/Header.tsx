import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '$store/store';
import classNames from 'classnames';
import { StyledEngineProvider } from '@mui/material/styles';
import {
  AppBar,
  useScrollTrigger,
  Toolbar,
  Button,
  Typography,
  ButtonBase,
  ListItem,
  List,
  Box,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Login as LoginIcon,
  AppRegistration as AppRegistrationIcon,
  ManageAccounts as ManageAccountsIcon,
  Home as HomeIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import LanguageToggler from '$components/LanguageToggler';
import { setToken } from '$store/appSlice';
import { ROUTES_PATHS } from '$settings/routing';
import { TOKEN_AUTH_LOCALSTORAGE } from '$settings/index';
import KanbanLogo from '$assets/kanban-logo.png';
import { TSimpleFunction } from '$types/common';
import css from './Header.module.scss';
import './Header.scss';

const Header: FC = () => {
  const { token } = useAppSelector((state) => state.app);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const trigger = useScrollTrigger();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(setToken(null));
    localStorage.removeItem(TOKEN_AUTH_LOCALSTORAGE);
    navigate(ROUTES_PATHS.welcome, { replace: true });
    closeMenu();
  };

  const burgerHandler: TSimpleFunction = () => {
    setOpenMenu((prev) => !prev);
  };

  const closeMenu: TSimpleFunction = () => {
    setOpenMenu(false);
  };

  return (
    <StyledEngineProvider injectFirst>
      <AppBar position="sticky" color={trigger ? 'primary' : 'inherit'} className={css.header}>
        <Toolbar className={css.header__wrapper}>
          <Typography className={css.header__heading} variant="h6" component="h1">
            <Button href={ROUTES_PATHS.welcome}>
              <Typography variant="inherit" component="span">
                Kanban
              </Typography>

              <Box
                className={css.header__logo}
                component="img"
                src={KanbanLogo}
                alt={t('Header.logo')}
              />
            </Button>
          </Typography>

          {token ? (
            <>
              <Box
                component="nav"
                className={classNames(css.header__nav, {
                  [css.active]: openMenu,
                })}
                onClick={closeMenu}
              >
                <List
                  className={css.header__nav_list}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <ListItem className={css.header__nav_listItem}>
                    <Button
                      onClick={closeMenu}
                      href={ROUTES_PATHS.profile}
                      startIcon={<ManageAccountsIcon />}
                    >
                      {t('Header.editProfile')}
                    </Button>
                  </ListItem>

                  <ListItem className={css.header__nav_listItem}>
                    <Button onClick={closeMenu} startIcon={<TableChartIcon />}>
                      {t('Header.newBoard')}
                    </Button>
                  </ListItem>

                  <ListItem className={css.header__nav_listItem}>
                    <Button onClick={closeMenu} href={ROUTES_PATHS.boards} startIcon={<HomeIcon />}>
                      {t('Header.goToMainPage')}
                    </Button>
                  </ListItem>
                </List>
              </Box>

              <Button href={ROUTES_PATHS.welcome} startIcon={<LogoutIcon />} onClick={handleLogOut}>
                {t('Header.signOut')}
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

          <>
            {token && (
              <ButtonBase
                className={classNames(css.header__burger, {
                  [css.active]: openMenu,
                })}
                aria-label={t('Header.burgerLabel')}
                onClick={burgerHandler}
              ></ButtonBase>
            )}
          </>
        </Toolbar>
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Header;
