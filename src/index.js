import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';

//import registerServiceWorker from './registerServiceWorker'

i18n
    .use(XHR)
    .use(LngDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'en',
        ns: ['common'],
        defaultNS: 'common',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        react: {
        }
    })

ReactDOM.render(<App />, document.getElementById('root'))
//registerServiceWorker();
