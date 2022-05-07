import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './translations/ru.json';
import en from './translations/en.json';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
