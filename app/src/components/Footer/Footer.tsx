import React, { FC } from 'react';
import { Grid, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import RSSchoolSign from '../../assets/svg/RSSchoolSign.svg';
import RSSchoolSign2 from '../../assets/svg/rs_school_js.svg';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <Grid
        container
        sx={{ flexWrap: 'nowrap', alignItems: 'center', padding: '20px', minHeight: '10vh' }}
      >
        <Grid item xs={2}>
          <Link href="https://github.com/TarasiukDima" underline="none">
            <img src={RSSchoolSign} alt={t('Footer.RSSchoolLogo')} />
          </Link>
        </Grid>
        <Grid container xs={8} sx={{ flexWrap: 'nowrap', justifyContent: 'space-evenly' }}>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <GitHubIcon />
            <Link href="https://github.com/TarasiukDima" underline="none">
              TarasiukDima
            </Link>
          </Grid>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <GitHubIcon />
            <Link href="https://github.com/exekuta" underline="none">
              exekuta
            </Link>
          </Grid>
          <Grid container sx={{ alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <GitHubIcon />
            <Link href="https://github.com/darya-startsava" underline="none">
              darya-startsava
            </Link>
          </Grid>
        </Grid>
        <Grid container xs={2} sx={{ alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <CopyrightIcon />
          <span>2022</span>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
