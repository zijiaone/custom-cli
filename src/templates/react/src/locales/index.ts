import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './en-US.json';
import zh from './zh-CN.json';

i18n
  .use(LanguageDetector) // 自动检测用户的语言设置
  .use(initReactI18next) // 将 i18next 绑定到 React
  .init({
    lng: 'en-US',
    fallbackLng: 'zh-CN', // 当找不到用户语言时使用的默认语言
    resources: {
      'zh-CN': {
        translation: zh,
      },
      'en-US': {
        translation: en,
      },
    },
    interpolation: {
      escapeValue: false, // 不需要对 HTML 进行转义
    },
  });

export default i18n;
