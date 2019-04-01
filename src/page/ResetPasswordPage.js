import React from "react"
import ResetPasswordForm from '../form/ResetPasswordForm.js'
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import { Background, ContrastedCTAButton, Header, Text, AccentedTwinCard, TwinCardChild, AccentedTwinCardChild } from '../component/BasicComponents.js'
import { Redirect } from 'react-router-dom'

const Left = TwinCardChild
const Right = styled(AccentedTwinCardChild)`
	@media (max-width: 768px) {
		display: none;
	}
`

class ResetPasswordPage extends React.Component {
    
    constructor(props) {
		super(props)
		this.redirectToLogin = this.redirectToLogin.bind(this)
		this.state = {
			redirectToLogin: false,
        }
        this.redirectToLogin = this.redirectToLogin.bind(this)
    }
    
    redirectToLogin = () => this.setState({ redirectToLogin: true })

    render = () => {
        const g = this.props.login
		const c = this.props.i18n
		const { nextPath, passOnState } = this.props.location.state || { nextPath: '/login' }

		if (this.state.redirectToLogin) {
			return ( <Redirect to={{ pathname: '/login', state: { nextPath: nextPath, passOnState: passOnState } }} /> )
		}
		
		return (
			<Background>
				<AccentedTwinCard>
					<Left>
						<Header>
							{c.t('Forgot password?')}
						</Header>
						<Text>
							{c.t('Please provide your email or mobile number that linked to your account.')}
						</Text>
						<ResetPasswordForm user={{}} {...this.props} />
					</Left>

					<Right>
						<Header color='#fff' align='center'>
							{c.t('If you know your password, please')}
						</Header>
						<ContrastedCTAButton onClick={this.redirectToLogin}>
							{c.t('Login')}
						</ContrastedCTAButton>
					</Right>
				</AccentedTwinCard>
			</Background>
		)
    }
}

export default ResetPasswordPage