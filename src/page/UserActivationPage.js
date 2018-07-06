import React from "react"
import { ApolloProvider, Mutation } from 'react-apollo'
import { I18n } from 'react-i18next'

import UserActivationForm from '../form/UserActivationForm.js'


import Background from '../component/Background.js'
import { BigLoadingScreen } from '../component/Loading.js'
import { Redirect } from "react-router-dom"

import GqlApi, { GqlApiSubscriber } from '../container/GqlApi.js'
import { verifyUser } from '../gql/query.js'

class UserActivationPage extends React.Component {
    
    render() {
        return (
            <I18n>
            {(t, { i18n }) => (
                <Background>
                    <h1>{t('User Activation')}</h1>
                    <UserActivationForm match={this.props.match} />
                </Background>
            )}
            </I18n>
        )
    }
}

export default UserActivationPage