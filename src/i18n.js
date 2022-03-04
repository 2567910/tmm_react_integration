import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import axios from 'axios'
import HttpApi from 'i18next-http-backend';

axios.defaults.baseURL = 'https://tmm.azure.blu-beyond.com/translations/test_final'
axios.defaults.timeout = 500
let fallbackResourcesPath = './lang'

axios.defaults.headers = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET',
}

const getTranslationsFromServer = async (locale) => {
  return new Promise((resolve, reject) => {
    axios.get(locale).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

let options = {
  loadPath: '/{{lng}}',
  request: (options, url, payload, callback) => {
    const [lng] = url.split('|');
    const fallbackJSON = require(fallbackResourcesPath + lng + '.json');

    getTranslationsFromServer(lng).then((response) => {
      callback(null, {
        data: response,
        status: 200,
      });
    }).catch(() => {
      callback(null, {
        data: fallbackJSON,
        status: 200,
      });
    });
  },
  crossDomain: true,
  withCredentials: true,
}

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    backend: options,
    react: {
      useSuspense: true
    }
  });

export default i18n;