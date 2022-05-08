import React from 'react';
import { Grid, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import youtubeBigSign from '../../assets/svg/youtubeBigSign.svg';

const Welcome = () => {
  const { t } = useTranslation();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ background: 'linear-gradient(45deg,#f8a078,#6dc6f0)', height: '85vh' }}
    >
      <Grid
        item
        color="#fff"
        sx={{ fontSize: '72px', fontWeight: '600', lineHeight: '144px', marginTop: '31px' }}
      >
        <span>{t('Welcome.titleText')}</span>
      </Grid>
      <Grid>
        <Grid
          container
          justifyContent="center"
          direction="column"
          sx={{
            width: 600,
            height: 325,
            backgroundColor: '#000',
            textAlign: 'center',
            color: 'white',
            marginTop: '31px',
          }}
        >
          <img src={youtubeBigSign} alt={t('Welcome.youtubeSign')} />
        </Grid>
      </Grid>
      <Grid
        item
        color="#fff"
        sx={{
          fontSize: '32px',
          fontWeight: '600',
          lineHeight: '48px',
          width: '630px',
          textAlign: 'center',
          marginTop: '31px',
        }}
      >
        <span>{t('Welcome.welcomeText')}</span>
      </Grid>
      <Grid item>
        <Button variant="contained" sx={{ fontSize: '22px', fontWeight: '600', marginTop: '31px' }}>
          {t('Welcome.aboutUs')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Welcome;
