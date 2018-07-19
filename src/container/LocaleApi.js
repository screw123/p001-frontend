import React from "react";

import moment from 'moment'
import i18n from 'i18next'
import XHR from 'i18next-xhr-backend'
import LngDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'
import 'moment/locale/zh-hk'
import { Provider, Subscribe, Container } from "unstated"

class LocaleContainer extends Container {
    constructor() {
        super()
        const i18next = i18n
            .use(XHR)
            .use(LngDetector)
            .use(reactI18nextModule)
            .init({
                fallbackLng: 'en',
                ns: ['common'],
                defaultNS: 'common',
                backend: {
                    loadPath: '/locales/{{lng}}.json',
                },
                react: {
                }
})
        if (i18next.language==='zh-HK') { moment.locale('zh-HK') }
        this.state = {
            moment: moment ,
            i18n: i18next
        }
    }
    
    t = (...props) => {
        return this.state.i18n.t(...props)
    }

    moment = (...props) => {
        return this.state.moment(...props)
    }
    
    changeLanguage(lang) {
        this.state.i18n.changeLanguage(lang)
        moment.locale(lang)
        this.setState({moment: moment})
    }
}

const LocaleApi = new LocaleContainer();

export const LocaleApiProvider = props => {
    return <Provider inject={props.inject || [LocaleApi]}>{props.children}</Provider>;
};

export const LocaleApiSubscriber = props => {
    return <Subscribe to={props.to || [LocaleApi]}>{props.children}</Subscribe>;
};

export default LocaleApi;