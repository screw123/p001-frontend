import React from "react"
import LoginForm from '../form/LoginForm.js'
import { I18n } from 'react-i18next'
import Background from '../component/Background.js'
//import Cookies from 'js-cookie'
import { Redirect } from "react-router-dom"

import { GqlApiSubscriber } from '../container/GqlApi.js'

class LoginPage extends React.Component {
    
    
    render() {
        const { from } = this.props.location.state || { from: { pathname: "/dash" } };
        //console.log('cookie=', Cookies.get('_id'))
        return (
            <GqlApiSubscriber>
            {(c) => {
                if (c.state.isLogined) {
                    return <Redirect to={from} />;
                }
                else { return (
                    <I18n>
                    {(t, { i18n }) => (
                        <Background>
                            <h1>{(this.props.location.state)? t('Please Login First')+'...' : t('Login Page')}</h1>
                            <LoginForm />
                        </Background>
                    )}
                    </I18n>
                )}
            }}
            </GqlApiSubscriber>
        )
    }
}

export default LoginPage