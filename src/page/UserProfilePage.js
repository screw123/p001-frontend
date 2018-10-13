import React from "react"
import { I18n } from 'react-i18next'

import { Redirect } from "react-router-dom"
import UserProfileForm from '../form/UserProfileForm.js'

class UserActivationPage extends React.Component {
	
	constructor(props) { 
		super(props)
		this.state = {submitted: false}
	}

	redirect = () => this.setState({submitted: true})

    render() {
        return (
            <I18n>
            {(t, { i18n }) => (
				<div>
                    <h1>{t('Edit User Profile')}</h1>
					{!this.state.submitted && <UserProfileForm onSubmitSuccess={this.redirect} />}
					{this.state.submitted && <Redirect to={{pathname: '/dash'}} />}
				</div>
            )}
            </I18n>
        )
    }
}

export default UserActivationPage