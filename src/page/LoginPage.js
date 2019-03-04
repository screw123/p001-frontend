import React from 'react'
import LoginForm from '../form/LoginForm.js'
import { I18n } from 'react-i18next'
import { Background } from '../component/BasicComponents.js'
import { Redirect } from 'react-router-dom'

import * as Styles from './LoginPageStyles'

class LoginPage extends React.Component {
	constructor(props) {
		super(props)
		this.redirectToSignUp = this.redirectToSignUp.bind(this)
		this.state = { redirectToSignUp: false }
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
		} else {
			return (
				<Background>
					<Styles.Container>
						<Styles.LeftSide>
							<Styles.Para>
								{this.props.location.state
									? c.t('Please Login First') + '...'
									: c.t('Login Page')}
							</Styles.Para>
							<Styles.Title>
								{c.t('Lorem ipsum dolor sit amet, consectetur')}
							</Styles.Title>
							<Styles.Para>
								{c.t('Curabitur et rutrum ante, a malesuada felis.')}
							</Styles.Para>
							<LoginForm user={{}} {...this.props} />
						</Styles.LeftSide>

						<Styles.RightSide>
							<button onClick={this.redirectToSignUp}>{c.t('Sign Up Now!')}</button>
						</Styles.RightSide>
					</Styles.Container>
				</Background>
			)
		}
	}
}

export default LoginPage
