import React from "react"
import LoginForm from '../form/LoginForm.js'
import { I18n } from 'react-i18next'
import Background from '../component/Background.js'

class LoginPage extends React.Component {
    
    
    render = () => (
        <I18n>
            {(t, { i18n }) => (
                <Background>
                    <h1>{t('Login Page')}</h1>
                    <LoginForm />
                </Background>
            )}
        </I18n>

    )
}

export default LoginPage