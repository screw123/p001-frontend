import React from "react"

import SignUpForm from '../form/SignUpForm.js'
import UserActivationForm from '../form/UserActivationForm.js'
import LoginForm from '../form/LoginForm.js'

import GqlApi from '../stateContainer/GqlApi.js'
import LocaleApi from '../stateContainer/LocaleApi.js'

import { I18n } from 'react-i18next'

import Background from '../component/Background.js'
import {BigLoadingScreen } from '../component/Loading.js'

import { Redirect } from "react-router-dom"

/*
    1. Create User
        - will save password for use in (3)
        - will save verifyDeadLine for use in (2)
    2. Validate email/phone
        - will save _id for use in (3)
    3. Login user
    4. Create Account
    5. Purchase service
    6. Go to dashboard
    
    User may start at any stage
    userCreated ?
    | -- No > (1)
    Yes
    |
    userVerified ?
    | -- No > (2)
    Yes
    |
    GqlApi.state.isLogined ?
    | -- No > -- (state.user._id && state.user.password) ?
    Yes      loginAfterVerified < Yes -- |-- No > (3)
    |           |                          
    accountCreated                        
    | -- No > (4)                         
    Yes
    |
    (have any order) ?
    | -- No > (5)
    Yes -- > (6)
*/

class SignUpWorkflow extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            user: {},
            userCreated: false,
            account: {},
            accountCreated: false,
            userVerified: false,
            loading: false,
            errMsg: undefined
        }
        this.onUserCreated=this.onUserCreated.bind(this)
        this.onAccountCreated=this.onAccountCreated.bind(this)
        this.onUserVerified = this.onUserVerified.bind(this)
    }

    onUserCreated = (user) => this.setState({user: user, userCreated: true})
    onAccountCreated = (account) => this.setState({account: account, accountCreated: true})
    
    onUserVerified = async (uid) => {
        //set userVerified, so whole workflow goes to stage 3
        console.log('onUserVerified called')
        this.setState(prevState => ({userVerified: true, user: {...prevState.user, _id: uid}}))
        console.log('this.state.user=', this.state.user)
        //if we have both login and pw, show loading screen and login in background
        if ((this.state.user._id) && (this.state.user.password)) {
            
            this.setState({loading: true})
            const a = await this.loginAfterVerified()
            
            //if login successful, remove loading screen and go to stage 4 (another trigger is  GqlApi.isLogined, which will be auto set if login successful)
            //if login failed, will show errMsg and is also auto set
            if (a===true) { this.setState({loading: false}) }
        }
        else {
            //else, nothing to do as userVerified already true, but GqlApi.isLogined is false.  LoginForm will auto show
        }
    }
    
    async loginAfterVerified() {
        console.log('SignUpWorkflow.loginAfterVerified')
        const isLoginSuccess = await GqlApi.login({user: this.state.user._id, password: this.state.user.password})
        if (isLoginSuccess===true) { return new Promise((resolve, reject) => resolve(true)) }
        else { this.setState({errMsg: LocaleApi.t("System is currently busy, please wait for 1 minute and try again")}) }
    }
    
    render() {
        if (GqlApi.state.isLogined) return (<Redirect to='/dash' />)
        
        return(
        <div>
            {this.state.loading && <BigLoadingScreen />}
            {!this.state.loading && <I18n>
                {(t, { i18n }) => (
                    <Background>
                        {!(this.state.userCreated) &&
                            <div>
                                <h1>{t('Sign Up')}</h1>
                                <SignUpForm onUserCreated={this.onUserCreated} />
                            </div>
                        }
                        {this.state.userCreated && !(this.state.userVerified) &&
                            <div>
                                <h1>{t('User Activation')}</h1>
                                <UserActivationForm match={{params: {}}} user={this.state.user} onVerifySuccess={this.onUserVerified}/>
                            </div>
                        }
                        {this.state.userVerified && !(GqlApi.state.isLogined) &&
                            <div>
                                <h1>{t('Please login to continue')}</h1>
                                <LoginForm user={this.state.user} />
                            </div>
                        }
                    </Background>
                )}
            </I18n>}
            {this.state.errMsg && <p>{this.state.errMsg}</p>}
        </div>

    )}
}

export default SignUpWorkflow