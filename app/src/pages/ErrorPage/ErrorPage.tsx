import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import Section from '$components/Section';
import css from './ErrorPage.module.scss';

interface ILocationState {
  errorText: string;
}

const ErrorPage: FC = () => {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { errorText } = state as ILocationState;

  return (
    <Section className={css.errorPage} pageAllSpace={true}>
      <Typography component="h2" variant="inherit" className={css.errorPage__title} mb={5}>
        {t('ErrorPage.pageTitle')}
      </Typography>

      <Typography component="p" variant="inherit" className={css.errorPage__text}>
        {errorText}
      </Typography>
    </Section>
  );
};

export default ErrorPage;
