export const BaseSetting = {
  defaultLanguage: 'es_ES',
  languageSupport: ['en_EN', 'es_ES'],

  resourcesLanguage: {
    en_EN: {
      translation: require('./en.json'),
    },
    es_ES: {
      translation: require('./es.json'),
    },
  },
};
