import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

const LanguageToggler = () => {
  const [language, setLanguage] = useState<string>('en');
  const { i18n, t } = useTranslation();

  const handleChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <ToggleButtonGroup
      onChange={handleChange}
      exclusive
      value={language}
      aria-label={t('LanguageToggler.AriaLabelToggler')}
    >
      <ToggleButton value="en" arial-label={t('LanguageToggler.AriaLabelButtonEn')}>
        {t('LanguageToggler.ButtonEn')}
      </ToggleButton>

      <ToggleButton value="ru" arial-label={t('LanguageToggler.AriaLabelButtonRu')}>
        {t('LanguageToggler.ButtonRu')}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageToggler;
