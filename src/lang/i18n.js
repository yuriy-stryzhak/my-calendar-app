import {createI18n} from "vue-i18n";
import merge from 'lodash/merge';

// array of all languages
const langs = ["en"];

// default/current language
const config_lang_code = "en";

let lang_file = {};

const lang_files = import.meta.glob('./lang_*.json', { eager: true });
for (let lang of Object.keys(lang_files)) {
	lang_file = merge(lang_file, lang_files[lang].default);
}

const i18n = createI18n({
  legacy: false,
  locale: config_lang_code,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: lang_file,
});

createI18n.prototype.$t = function (item, attribute) {
  if (!item) return '';

  return item[attribute + '_' + i18n.locale] ?? '';
};

export default i18n;
