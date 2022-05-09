import React, { useState } from 'react';
import { Grid, Button, Modal, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import youtubeBigSign from '../../assets/svg/youtubeBigSign.svg';

import css from './Welcome.module.scss';

// const style = {
//   position: 'absolute' as const,
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

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
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ fontSize: '22px', fontWeight: '600', marginTop: '31px', marginBottom: '31px ' }}
        >
          {t('Welcome.aboutUs')}
        </Button>
        <Modal
          open={showAuthors}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Grid className={css.modal}>
            <Typography variant="h6" component="h2" align="center" sx={{ marginBottom: '20px' }}>
              {t('Welcome.aboutUs')}
            </Typography>
            <Grid container sx={{ justifyContent: 'center', gap: '20px' }}>
              <Grid item className={css.developer} direction="column">
                <PersonOutlineIcon />
                <Typography>TarasiukDima</Typography>
              </Grid>
              <Grid item className={css.developer} direction="column">
                <PersonOutlineIcon />
                <Typography>exekuta</Typography>
              </Grid>
              <Grid item className={css.developer} direction="column">
                <PersonOutlineIcon />
                <Typography>darya-startsava</Typography>
              </Grid>
            </Grid>
            <Typography sx={{ mt: 2 }} align="center">
              {t('Welcome.modalText')}
            </Typography>
          </Grid>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Welcome;
