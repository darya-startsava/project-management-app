import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import css from './LanguageToggler.module.scss';

const LanguageToggler = () => {
  const [language, setLanguage] = useState<string>('en');
  const { i18n, t } = useTranslation();

  const handleChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    if (!newLanguage) return;

    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const buttonClass = (lang: string) =>
    classNames(css.languageToggler__button, {
      [css.active]: lang === language,
    });

  return (
    <ToggleButtonGroup
      className={css.languageToggler}
      onChange={handleChange}
      exclusive
      value={language}
      aria-label={t('LanguageToggler.AriaLabelToggler')}
    >
      <ToggleButton
        className={buttonClass('en')}
        value="en"
        arial-label={t('LanguageToggler.AriaLabelButtonEn')}
      >
        {t('LanguageToggler.ButtonEn')}
      </ToggleButton>

      <ToggleButton
        className={buttonClass('ru')}
        value="ru"
        arial-label={t('LanguageToggler.AriaLabelButtonRu')}
      >
        {t('LanguageToggler.ButtonRu')}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageToggler;
