import React from "react"
import { getMyself } from '../gql/query.js'
import Background from '../component/BasicComponents.js'

import { I18n } from 'react-i18next'
import { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import { LocaleApiSubscriber } from '../stateContainer/LocaleApi.js'
import { ApolloProvider, Query } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'
import AddNewAddressForm from '../form/AddNewAddressForm'
import UserProfileForm from '../form/UserProfileForm.js'
import {Section} from '../component/Section.js'

class UserDashboardPage extends React.Component {
    constructor(props) {
        super(props)
        this.toggleUserProfileForm = this.toggleUserProfileForm.bind(this)
        this.state = {showUserProfileForm: false}
    }

    toggleUserProfileForm = () => {
        this.setState(prevState=> {return {showUserProfileForm: !prevState.showUserProfileForm} } )
    }

    genUserProfile = ({t, myself}) => (
        <div>
            <Section headerText={t('User Profile')} />
            <div>{t('Hello, user!', {name: myself.firstName + ' ' + myself.lastName}) }</div>
            {!this.state.showUserProfileForm && <button onClick={this.toggleUserProfileForm}>Edit</button>}
            {this.state.showUserProfileForm && <UserProfileForm {...this.props} />}
        </div>
    )

    render() { 
        const g = this.props.login
        const c = this.props.i18n
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
