import React from 'react'
import styled from 'styled-components'
import LoginForm from '../form/LoginForm.js'
import {
	Background,
	ContrastedCTAButton,
	Header,
	Text,
	AccentedTwinCard,
	TwinCardChild,
	AccentedTwinCardChild
} from '../component/BasicComponents.js'
import { Redirect } from 'react-router-dom'

const Left = TwinCardChild
const Right = styled(AccentedTwinCardChild)`
	@media (max-width: 768px) {
		display: none;
	}
`

class LoginPage extends React.Component {
	constructor(props) {
		super(props)
		this.redirectToSignUp = this.redirectToSignUp.bind(this)
		this.state = {
			redirectToSignUp: false
		}
	}

	redirectToSignUp = () => this.setState({ redirectToSignUp: true })

	render() {
		const g = this.props.login
		const c = this.props.i18n
		const { nextPath, passOnState } = this.props.location.state || { nextPath: '/dash' }

		if (g.state.isLogined) {
			return <Redirect to={{ pathname: nextPath, state: passOnState }} />
		}
		if (this.state.redirectToSignUp) {
			return (
				<Redirect
					to={{
						pathname: '/signup',
						state: { nextPath: nextPath, passOnState: passOnState }
					}}
				/>
			)
		}

		return (
			<Background>
				<AccentedTwinCard>
					<Left>
						<Header>{c.t('Please Login')}</Header>
						<Text>
							{c.t(
								'Please provide either your email or mobile phone number to login'
							)}
						</Text>
						<LoginForm user={{}} {...this.props} />
					</Left>

					<Right>
						<Header color='#fff' align='center'>
							{c.t('Hi, create new account')}
						</Header>
						<Text color='#fff' align='center'>
							{c.t(
								'Curabitur et rutrum ante, a malesuada felis.Curabitur et rutrum ante, a malesuada felis.'
							)}
						</Text>
						<ContrastedCTAButton onClick={this.redirectToSignUp}>
							{c.t('Sign Up')}
						</ContrastedCTAButton>
					</Right>
				</AccentedTwinCard>
			</Background>
		)
	}
}

export default LoginPage
