import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/translation.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    load: 'languageOnly',
    fallbackLng: false,
    lng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    // react i18next special options (optional)
    // keySeparator: false,
    react: {
      wait: true,
    },
  });


export default i18n;
