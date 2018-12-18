import React from "react"

import SignUpForm from '../form/SignUpForm.js'
import UserActivationForm from '../form/UserActivationForm.js'
import LoginForm from '../form/LoginForm.js'

import {Background} from '../component/BasicComponents.js'
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
        const isLoginSuccess = await this.props.login.login({user: this.state.user._id, password: this.state.user.password})
        if (isLoginSuccess===true) { return new Promise((resolve, reject) => resolve(true)) }
        else { this.setState({errMsg: "System is currently busy, please wait for 1 minute and try again"}) }
    }
    
    render() {
        const g = this.props.login
        const c = this.props.i18n
        const { nextPath, passOnState } = this.props.location.state || { nextPath: "/dash" }

        console.log('nextPath, passOnState=', nextPath, passOnState)
        if (g.state.isLogined) {
            return <Redirect to={{pathname: nextPath, state: passOnState}} />
        }

        return(
        <div>
            {this.state.loading && <BigLoadingScreen />}
            {!this.state.loading && 
                <Background>
                    {!(this.state.userCreated) &&
                        <div>
                            <h1>{c.t('Sign Up')}</h1>
                            <SignUpForm onUserCreated={this.onUserCreated} {...this.props} />
                        </div>
                    }
                    {this.state.userCreated && !(this.state.userVerified) &&
                        <div>
                            <h1>{c.t('User Activation')}</h1>
                            <UserActivationForm match={{params: {}}} user={this.state.user} onVerifySuccess={this.onUserVerified} {...this.props} />
                        </div>
                    }
                    {this.state.userVerified && !(g.state.isLogined) &&
                        <div>
                            <h1>{c.t('Please login to continue')}</h1>
                            <LoginForm user={this.state.user} {...this.props} />
                        </div>
                    }
                </Background>
            }
            {this.state.errMsg && <p>{c.t(this.state.errMsg)}</p>}
        </div>

    )}
}

export default SignUpWorkflow