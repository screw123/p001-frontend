import React from "react"
import SignUpForm from '../form/SignUpForm.js'
import { I18n } from 'react-i18next'

import Background from '../component/Background.js'

class SignUpPage extends React.Component {
    
    
    render = () => (
        <I18n>
            {(t) => (
                <Background>
                    <h1>{t('Sign Up')}</h1>
                    <SignUpForm />
                </Background>
            )}
        </I18n>

    )
}

export default SignUpPage