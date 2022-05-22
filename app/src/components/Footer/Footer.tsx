import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Link, Box } from '@mui/material';
import { GitHub as GitHubIcon, Copyright as CopyrightIcon } from '@mui/icons-material';
import RSSchoolSign from '$assets/svg/RSSchoolSign.svg';
import css from './Footer.module.scss';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <Grid container className={css.footerContainer}>
        <Grid item xs={2}>
          <Box className={css.centerBox}>
            <Link href="https://rs.school/" underline="none">
              <img src={RSSchoolSign} alt={t('Footer.RSSchoolLogo')} />
            </Link>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box className={css.githubContainer}>
            <Box className={css.centerBox}>
              <GitHubIcon sx={{ color: '#001A33' }} />
              <Link
                href="https://github.com/TarasiukDima"
                underline="none"
                sx={{ color: '#001A33' }}
              >
                TarasiukDima
              </Link>
            </Box>

            <Box className={css.centerBox}>
              <GitHubIcon sx={{ color: '#001A33' }} />
              <Link href="https://github.com/exekuta" underline="none" sx={{ color: '#001A33' }}>
                exekuta
              </Link>
            </Box>

            <Box className={css.centerBox}>
              <GitHubIcon sx={{ color: '#001A33' }} />
              <Link
                href="https://github.com/darya-startsava"
                underline="none"
                sx={{ color: '#001A33' }}
              >
                darya-startsava
              </Link>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={2}>
          <Box className={css.centerBox}>
            <CopyrightIcon sx={{ color: '#001A33' }} />
            <span style={{ color: '#001A33' }}>2022</span>
          </Box>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
