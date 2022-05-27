import React, { useState } from 'react';
import { Button, Typography, ListItem, List, CardMedia, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Lightbox from '$components/Lightbox';
import Section from '$components/Section';
import YouTubeIcon from '@mui/icons-material/YouTube';
import author1 from '$assets/images/Dmitrij.jpg';
import author2 from '$assets/images/Andrey.jpg';
import author3 from '$assets/images/Darya.jpeg';
import css from './Welcome.module.scss';

//TODO: Заменить текст-заглушку "Об авторах" в модальном окне

const Welcome = () => {
  const [showAuthors, setShowAuthors] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleOpen = () => setShowAuthors(true);
  const handleClose = () => setShowAuthors(false);

  return (
    <>
      <Section pageAllSpace={true} className={css.welcomePage}>
        <Typography className={css.welcomePage_title} mb={5}>
          {t('Welcome.titleText')}
        </Typography>

        <CardMedia className={css.welcomePage_youtube} src="iframe">
          <YouTubeIcon aria-label={t('Welcome.youtubeSign')} />
        </CardMedia>

        <Typography className={css.welcomePage_text}>{t('Welcome.welcomeText')}</Typography>

        <Button
          className={css.welcomePage_button}
          onClick={handleOpen}
          aria-label={t('Welcome.btnAboutUsAriaLabel')}
        >
          {t('Welcome.aboutUs')}
        </Button>
      </Section>

      <Lightbox
        showModal={showAuthors}
        closeModalFunction={handleClose}
        modalTitle={t('Welcome.aboutUs')}
        classNameContentWrapper={css.modalWrapper}
      >
        <List className={css.developerList}>
          <ListItem className={css.developerList__item}>
            <Box
              className={css.developerList__item_photo}
              component="img"
              src={author1}
              alt={t('Welcome.author1')}
            />
            <Typography className={css.developerList__item_name}>{t('Welcome.author1')}</Typography>
          </ListItem>

          <ListItem className={css.developerList__item}>
            <Box
              className={css.developerList__item_photo}
              component="img"
              src={author2}
              alt={t('Welcome.author2')}
            />
            <Typography className={css.developerList__item_name}>{t('Welcome.author2')}</Typography>
          </ListItem>

          <ListItem className={css.developerList__item}>
            <Box
              className={css.developerList__item_photo}
              component="img"
              src={author3}
              alt={t('Welcome.author3')}
            />
            <Typography className={css.developerList__item_name}>{t('Welcome.author3')}</Typography>
          </ListItem>
        </List>

        <Typography className={css.developersDescription} align="center">
          {t('Welcome.modalText')}
        </Typography>
      </Lightbox>
    </>
  );
};

export default Welcome;
