import { FC } from 'react';

import { AppBar, Container, useScrollTrigger, Toolbar, Button } from '@mui/material';
import LanguageToggler from '$components/general/LanguageToggler';
import { useTranslation } from 'react-i18next';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { useAppSelector } from '$store/store';
import { ROUTES_PATHS } from '$settings/routing';

const Header: FC = () => {
  const { token } = useAppSelector((state) => state.app);
  const { t } = useTranslation();
  const trigger = useScrollTrigger();

  return (
    <AppBar position="sticky" color={trigger ? 'secondary' : 'inherit'}>
      <Toolbar>
        <Container>
          <LanguageToggler />
          <Button
            aria-label={t('Header.editProfile')}
            sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
            startIcon={<ManageAccountsIcon />}
          >
            {t('Header.editProfile')}
          </Button>
          <Button
            href={ROUTES_PATHS.logout}
            aria-label={t('Header.signOut')}
            sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
            startIcon={<LogoutIcon />}
          >
            {t('Header.signOut')}
          </Button>
          <Button
            aria-label={t('Header.newBoard')}
            sx={{ textTransform: 'none', color: '#001a33', fontSize: '16px' }}
            startIcon={<DeveloperBoardIcon />}
          >
            {t('Header.newBoard')}
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
