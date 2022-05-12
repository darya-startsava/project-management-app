import React, { useState } from 'react';
import { Grid, Button, Modal, Typography, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import youtubeBigSign from '../../assets/svg/youtubeBigSign.svg';
import author1 from '../../assets/images/Dmitrij.jpg';
import author2 from '../../assets/images/Andrey.jpg';
import author3 from '../../assets/images/Darya.jpeg';

import css from './Welcome.module.scss';

//TODO: Заменить текст-заглушку "Об авторах" в модальном окне

const Welcome = () => {
  const [showAuthors, setShowAuthors] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleOpen = () => setShowAuthors(true);
  const handleClose = () => setShowAuthors(false);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      sx={{ background: 'linear-gradient(45deg,#f8a078,#6dc6f0)' }}
    >
      <Grid item color="#fff" sx={{ marginTop: '31px' }}>
        <Typography sx={{ fontSize: '72px', fontWeight: '600', lineHeight: '144px' }}>
          {t('Welcome.titleText')}
        </Typography>
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
          width: '630px',
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{ fontSize: '32px', fontWeight: '600', lineHeight: '48px', marginTop: '31px' }}
        >
          {t('Welcome.welcomeText')}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleOpen}
          aria-label={t('Welcome.btnAboutUsAriaLabel')}
          sx={{ fontSize: '22px', fontWeight: '600', marginTop: '31px', marginBottom: '31px ' }}
        >
          {t('Welcome.aboutUs')}
        </Button>
        <Modal
          open={showAuthors}
          onClose={handleClose}
          aria-labelledby={t('Welcome.modalTitleAriaLabel')}
          aria-describedby={t('Welcome.modalDescriptionAriaLabel')}
        >
          <Grid className={css.modal}>
            <Typography variant="h6" component="h2" align="center" sx={{ mb: 6 }}>
              {t('Welcome.aboutUs')}
            </Typography>
            <Grid container sx={{ justifyContent: 'center', gap: '20px' }}>
              <Grid item className={css.developer} direction="column">
                <Avatar alt={t('Welcome.author1')} src={author1} sx={{ width: 200, height: 200 }} />
                <Typography sx={{ mt: 2 }}>{t('Welcome.author1')}</Typography>
              </Grid>
              <Grid item className={css.developer} direction="column">
                <Avatar alt={t('Welcome.author2')} src={author2} sx={{ width: 200, height: 200 }} />
                <Typography sx={{ mt: 2 }}>{t('Welcome.author2')}</Typography>
              </Grid>
              <Grid item className={css.developer} direction="column">
                <Avatar alt={t('Welcome.author3')} src={author3} sx={{ width: 200, height: 200 }} />
                <Typography sx={{ mt: 2 }}>{t('Welcome.author3')}</Typography>
              </Grid>
            </Grid>
            <Typography sx={{ mt: 4 }} align="center">
              {t('Welcome.modalText')}
            </Typography>
          </Grid>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Welcome;
