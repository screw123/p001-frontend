import React from "react"

import SignUpForm from '../form/SignUpForm.js'
import UserActivationForm from '../form/UserActivationForm.js'


import { I18n } from 'react-i18next'

import Background from '../component/Background.js'

class SignUpWorkflow extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            user: {
                _id: "5b49d6a6f7d0e820e0ae004e",
                verifyDeadline: "2018-07-17T10:00:00.242Z"
            },
            userCreated: true,
            account: {},
            accountCreated: false,
            userVerified: false,
        }
        this.onUserCreated=this.onUserCreated.bind(this)
        this.onAccountCreated=this.onAccountCreated.bind(this)
        this.onUserVerified = this.onUserVerified.bind(this)
    }
    
    onUserCreated = (user) => this.setState({user: user, userCreated: true})
    onAccountCreated = (account) => this.setState({account: account, accountCreated: true})
    onUserVerified = () => this.setState({userVerified: true})
    
    render() {return(
        <I18n>
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
                {this.state.userVerified && !(this.state.accountCreated) &&
                    <div>
                        Validated!  Now pls create account.  Fixme help user login first
                    </div>
                    
                }
                </Background>
            )}
        </I18n>

    )}
}

export default SignUpWorkflow