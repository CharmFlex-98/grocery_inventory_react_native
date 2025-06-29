import i18n from 'i18next';
import en from './locales/en.json';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

// Define the type for supported languages
export type TranslationKeys = keyof typeof en;

// Detect the device language
const getDeviceLanguage = (): string => {
    const locales = getLocales();
    return locales[0]?.languageTag || 'en';
};

// Initialize i18next
export const localeInit = () => {
    i18n.use(initReactI18next).init({
        compatibilityJSON: 'v4',
        resources: {
            en: { translation: en },
        },
        lng: getDeviceLanguage(),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })
}