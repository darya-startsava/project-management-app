import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const LanguageSwitch = () => {
  const { i18n, t } = useTranslation();

  const handleLanguagePick = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <ButtonGroup variant="contained" aria-label={t('LanguageSwitch.BtnGroupAriaLabel')}>
      <Button onClick={() => handleLanguagePick('en')}>EN</Button>
      <Button onClick={() => handleLanguagePick('ru')}>RU</Button>
    </ButtonGroup>
  );
};

export default LanguageSwitch;
