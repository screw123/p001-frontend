import React from "react"
import { I18n } from 'react-i18next'

import UserActivationForm from '../form/UserActivationForm.js'


import {Background} from '../component/BasicComponents.js'

class UserActivationPage extends React.Component {
    
    render() {
        return (
            <I18n>
            {(t, { i18n }) => (
                <Background>
                    <h1>{t('User Activation')}</h1>
                    <UserActivationForm match={this.props.match} user={{}} />
                </Background>
            )}
            </I18n>
        )
    }
}

export default UserActivationPage