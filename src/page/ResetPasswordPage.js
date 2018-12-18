import React from "react"
import ResetPasswordForm from '../form/ResetPasswordForm.js'
import { I18n } from 'react-i18next'

import {Background} from '../component/BasicComponents.js'

class ResetPasswordPage extends React.Component {
    
    
    render = () => (
        <I18n>
            {(t) => (
                <Background>
                    <h1>{t('Reset Your Password')}</h1>
                    <ResetPasswordForm />
                </Background>
            )}
        </I18n>

    )
}

export default ResetPasswordPage