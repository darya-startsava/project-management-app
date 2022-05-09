import React, { FC } from 'react';
import { Grid, Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RSSchoolSign from '../../assets/svg/RSSchoolSign.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <Grid container sx={{ padding: '20px', minHeight: '10vh' }}>
        <Grid container xs={2} sx={{ justifyContent: 'center' }}>
          <Link href="https://rs.school/" underline="none">
            <img src={RSSchoolSign} alt={t('Footer.RSSchoolLogo')} />
          </Link>
        </Grid>
        <Grid container xs={8} sx={{ flexWrap: 'nowrap' }}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <GitHubIcon />
            <Link href="https://github.com/TarasiukDima" underline="none" sx={{ color: '#001A33' }}>
              TarasiukDima
            </Link>
          </Grid>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <GitHubIcon />
            <Link href="https://github.com/exekuta" underline="none" sx={{ color: '#001A33' }}>
              exekuta
            </Link>
          </Grid>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <GitHubIcon />
            <Link
              href="https://github.com/darya-startsava"
              underline="none"
              sx={{ color: '#001A33' }}
            >
              darya-startsava
            </Link>
          </Grid>
        </Grid>
        <Grid container xs={2} sx={{ alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <CopyrightIcon />
          <Typography>{new Date().getFullYear()}</Typography>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
