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
		const c = this.props.i18n
        return (
			<div>
				<h1>{c.t('Edit User Profile')}</h1>
				{!this.state.submitted && <UserProfileForm onSubmitSuccess={this.redirect} {...this.props} />}
				{this.state.submitted && <Redirect to={{pathname: '/dash'}} />}
			</div>
        )
    }
}

export default UserActivationPage