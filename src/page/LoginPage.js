import React from "react"
import LoginForm from '../form/LoginForm.js'
import { I18n } from 'react-i18next'
import Background from '../component/BasicComponents.js'
import { Redirect } from "react-router-dom"

import { GqlApiSubscriber } from '../stateContainer/GqlApi.js'

class LoginPage extends React.Component {
    
    constructor(props){
        super(props)
        this.state ={ redirect: false, path: '' }
    }

    redirect(path) {
        this.setState({redirect: true, path: path})
    }

    render() {
        const g = this.props.login
        const c = this.props.i18n
        console.log('state=', this.props.location.state)
        const { from, ...otherProps } = this.props.location.state || { from: "/dash" }


        if (g.state.isLogined) {
            return <Redirect to={{pathname: from, state: {...otherProps}}} />
        }
        else { return (
            <Background>
                <h1>{(this.props.location.state)? c.t('Please Login First')+'...' : c.t('Login Page')}</h1>
                <LoginForm user={{}} {...this.props} />
            </Background>
        )}
    }
}

export default LoginPage