import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resources from './i18nResources';

const i18nOptions: any = {
    fallbackLng: 'en',
    debug: false,
    interpolation: {
        escapeValue: false,
    },
    resources
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nOptions);

export default i18n;
