import React, { FC } from 'react';

import { Typography } from '@mui/material';
import Section from '$components/Section';
import { useTranslation } from 'react-i18next';

import css from './NotFoundPage.module.scss';

const NotFoundPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Section className={css.error_page} pageAllSpace={true}>
      <Typography className={css.error_heading} variant="h3">
        {t('NotFoundPage.heading')}
      </Typography>
      <Typography className={css.error_text} variant="h5">
        {t('NotFoundPage.text')}
      </Typography>
      <Typography variant="h6">{t('NotFoundPage.checkUrlText')}</Typography>
    </Section>
  );
};

export default NotFoundPage;
