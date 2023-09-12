import { I18n } from 'i18n-js';

import en from './locales/transalation.json';

const i18n = new I18n({ ...en });

i18n.defaultLocale = 'en';
i18n.locale = 'en';

export default (name: string, params = {}) => {
  return i18n.t(name, params);
};
