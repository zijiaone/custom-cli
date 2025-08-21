import { createI18n } from 'vue-i18n';

import en from './en-US.json';
import zh from './zh-CN.json';

const i18n = createI18n({
  locale: 'zh-CN', // 设置默认语言，可根据需求修改
  fallbackLocale: 'zh-CN', // 设置回退语言
  legacy: false,
  messages: {
    'en-US': en,
    'zh-CN': zh,
  },
});

export default i18n;
