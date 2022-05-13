import { FC } from 'react';

import { AppBar, useScrollTrigger, Toolbar, Button, Grid } from '@mui/material';
import LanguageToggler from '$components/general/LanguageToggler';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import HomeIcon from '@mui/icons-material/Home';
import { useAppSelector } from '$store/store';
import { ROUTES_PATHS } from '$settings/routing';

const Header: FC = () => {
  const { token } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const trigger = useScrollTrigger();

  return (
    <AppBar position="sticky" color={trigger ? 'primary' : 'inherit'}>
      <Toolbar>
        <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
          <LanguageToggler />
          {token ? (
            <>
              <Button
                href={ROUTES_PATHS.profile}
                sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
                startIcon={<ManageAccountsIcon />}
              >
                {t('Header.editProfile')}
              </Button>
              <Button
                href={ROUTES_PATHS.logout}
                sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
                startIcon={<LogoutIcon />}
              >
                {t('Header.signOut')}
              </Button>
              <Button
                sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
                startIcon={<DeveloperBoardIcon />}
              >
                {t('Header.newBoard')}
              </Button>
              <Button
                href={ROUTES_PATHS.welcome}
                sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
                startIcon={<HomeIcon />}
              >
                {t('Header.goToMainPage')}
              </Button>
            </>
          ) : (
            <>
              <Button
                href={ROUTES_PATHS.login}
                sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
                startIcon={<LoginIcon />}
              >
                {t('Header.signIn')}
              </Button>
              <Button
                href={ROUTES_PATHS.registration}
                sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
                startIcon={<AppRegistrationIcon />}
              >
                {t('Header.signUp')}
              </Button>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
