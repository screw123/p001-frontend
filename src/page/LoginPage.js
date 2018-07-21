import React from "react"
import LoginForm from '../form/LoginForm.js'
import { I18n } from 'react-i18next'
import Background from '../component/Background.js'
import { Redirect } from "react-router-dom"

import { GqlApiSubscriber } from '../container/GqlApi.js'

class LoginPage extends React.Component {
    
    constructor(props){
        super(props)
        this.state ={ redirect: false, path: '' }
    }

    redirect(path) {
        this.setState({redirect: true, path: path})
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/dash" } };
        return (
            <GqlApiSubscriber>
            {(c) => {
                if (c.state.isLogined) {
                    return <Redirect to={from} />;
                }
                else if (this.state.redirect===true) {
                    return <Redirect to={this.state.path} />;
                }
                else { return (
                    <I18n>
                    {(t) => (
                        <Background>
                            <h1>{(this.props.location.state)? t('Please Login First')+'...' : t('Login Page')}</h1>
                            <LoginForm user={{}}/>
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