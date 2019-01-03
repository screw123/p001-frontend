import React from "react"
import styled from 'styled-components'
import { getMyself } from '../gql/query.js'
import {Background} from '../component/BasicComponents.js'

import { ApolloProvider, Query } from "react-apollo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BigLoadingScreen} from '../component/Loading.js'
import UserProfileForm from '../form/UserProfileForm.js'
import AccountListForm from '../form/AccountListForm.js'

import { Redirect } from "react-router-dom"

import {Section, ClickableText} from '../component/BasicComponents.js'

const DashboardLink = (props) =>(
    <ClickableText onClick={props.onClick}>
        {props.leftIcon && <FontAwesomeIcon icon={props.leftIcon} /> }
        {props.leftIcon && ' '}
        {props.caption}
    </ClickableText>
)

class UserDashboardPage extends React.Component {
    constructor(props) {
        super(props)
        this.toggleUserProfileForm = this.toggleUserProfileForm.bind(this)
        this.state = {
            showUserProfileForm: false,
            showAccountListForm: true,
            redirectPath: undefined,
            passOnState: undefined
        }
    }

    toggleUserProfileForm = () => {
        this.setState({
            redirectPath: '/editUser',
            passOnState: undefined
        })
    }

    genUserProfile = ({t, myself}) => (
        <div>
            <Section headerText={t('Hello, user!', {name: myself.firstName + ' ' + myself.lastName}) }>
                <DashboardLink onClick={this.toggleUserProfileForm} leftIcon='sign-in-alt' caption={t('Edit User')} />
                
            </Section>
            {this.state.showAccountListForm && <AccountListForm {...this.props} />}
        </div>
    )
    
    render() { 
        const g = this.props.login
        const c = this.props.i18n

        if (this.state.redirectPath !== undefined) { return <Redirect push to={{pathname: this.state.redirectPath, state: this.state.passOnState}} />}
        return (
            <div>
                {this.genUserProfile({t: c.t, myself:g.state.myself})}

                <ApolloProvider client={g.getGqlClient()}><Query query={getMyself}>
                {({ loading, error, data }) => (
                    <div>1</div>
                )}</Query></ApolloProvider>
            </div>
        )
    }
}

export default UserDashboardPage
