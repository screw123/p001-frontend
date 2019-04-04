import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import { Redirect } from "react-router-dom"
import UserProfileForm from '../form/UserProfileForm.js'

import { Background, ContrastedCTAButton, Header, Text, TwinCard, TwinCardChild, StraightRow } from '../component/BasicComponents.js'

const Left = TwinCardChild
const Right = styled(TwinCardChild)`
	background-image: url('/images/profile.svg');
	background-repeat: no-repeat;
	background-position: center;
	@media (max-width: 768px) {
		display: none;
	}
`

class UserActivationPage extends React.Component {
	
	constructor(props) { 
		super(props)
		this.state = {submitted: false}
	}

	redirect = () => this.setState({submitted: true})

    render() {
		const c = this.props.i18n
		if (this.state.submitted) { return ( <Redirect to={{pathname: '/dash'}} /> )}
        return (
			<Background>
				<TwinCard>
					<Left>
						<Header>
							{c.t('Edit User Profile')}
						</Header>
						<UserProfileForm onSubmitSuccess={this.redirect} {...this.props} />
					</Left>

					<Right>
						
					</Right>
				</TwinCard>
			</Background>
        )
    }
}

export default UserActivationPage