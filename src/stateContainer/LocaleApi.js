//This is for keeping the i18n object and the moment object with correct locale
//i18n object can also be obtained by using I18n from react-i18next, same effect
//however moment object with locale must use the instance from here
//changing language of the whole app, must also use the changeLanguage() function here

import React from 'react';

import moment from 'moment';
import i18n from 'i18next';
import Fetch from 'i18next-fetch-backend';
import XHR from 'i18next-xhr-backend';
import LngDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';
import 'moment/locale/zh-hk';
import { Provider, Subscribe, Container } from 'unstated';
import en from './en.json'
import zhHK from './zh-HK.json'

class LocaleContainer extends Container {
    constructor() {
        super()
        const i18next = i18n
            //.use(Fetch)
            .use(LngDetector)
            .use(reactI18nextModule)
            .init({
                //init launch for force preload translation file
                resources: {
                    en: { common: en },
                    "zh-HK": { common: zhHK }
                },
                fallbackLng: 'en',
                preload: ['en', 'zh-HK'],
                ns: ['common'],
                defaultNS: 'common',
                /*backend: {
                    loadPath: (lngs, namespaces)=> {
                        if (lngs==='en') return 'https://jsonblob.com/api/67291dc1-5452-11e9-83d2-5bca2b6c0895'
                        else return 'https://jsonblob.com/api/3c809bbd-5457-11e9-83d2-c74ccd7fe1c3'

                    }
                    //loadPath: '/locales/{{lng}}.json',
                },*/
                interpolation: {
                    escapeValue: false // react already safes from xss
                },
                react: {
                },
                debug: false
            })

        if (i18next.language === 'zh-HK') {
            moment.locale('zh-HK');
        }
        this.state = {
            moment: moment,
            i18n: i18next,
            defaultHeight: parseFloat(getComputedStyle(document.body).fontSize),
            width: 0,
            height: 0,
            scrollTop: 0,
        };
    }

    updateWindowDimensions() { this.setState({ width: window.innerWidth, height: window.innerHeight }) }
    updateWindowPosition() { this.setState({ scrollTop: document.body.scrollTop || document.documentElement.scrollTop }) }

    t = (...props) => {
        return this.state.i18n.t(...props);
    };

    moment = (...props) => {
        return this.state.moment(...props);
    };

    changeLanguage(lang) {
        this.state.i18n.changeLanguage(lang);
        moment.locale(lang);
        this.setState({ moment: moment });
    }

    getCurrentLangForGql() {
        return this.state.i18n.language === 'en' ? 'en' : 'zhHK';
    }
}

const LocaleApi = new LocaleContainer();

export const LocaleApiProvider = (props) => {
    return <Provider inject={props.inject || [LocaleApi]}>{props.children}</Provider>;
};

export const LocaleApiSubscriber = (props) => {
    return <Subscribe to={props.to || [LocaleApi]}>{props.children}</Subscribe>;
};

export default LocaleApi;
