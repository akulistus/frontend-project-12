import i18n from 'i18next';
import resources from './locales/index';
import { initReactI18next } from 'react-i18next';

i18n.
  use(initReactI18next)
  .init({
    lng:'ru',
    resources,
  });

export default i18n;