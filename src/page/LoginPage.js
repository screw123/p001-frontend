import React from "react"
import LoginForm from '../form/LoginForm.js'
import { I18n } from 'react-i18next'


class LoginPage extends React.Component {
    
    
    render = () => (
        <I18n>
            {(t, { i18n }) => (
                <div>
                    <h1>{t('Login Page')}</h1>
                    <LoginForm />
                </div>
            )}
        </I18n>

    )
}

export default LoginPage