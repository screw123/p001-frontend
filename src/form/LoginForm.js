import React from 'react'
import { Redirect } from 'react-router-dom'

import { Formik, Field } from 'formik'
import { CTAButton } from '../component/BasicComponents.js'
import FormikForm, {
	TextField,
	FormButton,
	FormButtonBasic,
	FormErr,
	FieldRow
} from '../component/FormikForm.js'
import styled from 'styled-components'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
import ResetPasswordForm from './ResetPasswordForm.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

const ButtonsWrapper = styled.div`
	padding-top: ${props => (props.mobile ? '2rem' : '0')};
	justify-content: ${props => (props.mobile ? 'space-between' : 'flex-end')};
	@media (min-width: 769px) {
		display: ${props => (props.mobile ? 'none' : 'flex')};
	}
	@media (max-width: 768px) {
		display: ${props => (props.mobile ? 'flex' : 'none')};
	}
`

class LoginForm extends React.PureComponent {
	constructor(props) {
		super(props)
		this.state = { redirectToResetPw: false }
	}
	showResetPasswordForm = () => this.setState({ redirectToResetPw: true })
	goToSignUpPage = () => this.props.history.push('/signup')

	//props= user object
	render() {
		const g = this.props.login
		const c = this.props.i18n
		if (this.state.redirectToResetPw) {
			return (
				<Redirect
					to={{
						pathname: '/resetPassword',
						state: { nextPath: { nextPath: '/login' }, passOnState: {} }
					}}
				/>
			)
		}
		return (
			<Formik
				initialValues={{
					user:
						this.props.user._id ||
						this.props.user.email ||
						this.props.user.mobilePhone ||
						'',
					password: ''
				}}
				validate={values => {
					const keyArr = Object.keys(validateForm)
					let err = {}
					for (let i = 0; i < keyArr.length; i++) {
						const f = keyArr[i]
						const e = validateForm[f](values)
						if (e !== undefined) {
							err[f] = e
						}
					}
					return err
				}}
				onSubmit={async (values, actions) => {
					actions.setStatus('')
					const isLoginSuccess = await g.login({
						user: values.user,
						password: values.password
					})
					if (isLoginSuccess === true) {
						if (this.props.onLoginSuccess) {
							this.props.onLoginSuccess()
						}
					} else {
						switch (isLoginSuccess) {
							case 401:
								actions.setFieldError(
									'password',
									c.t(
										'Email/Phone or password error.  Please check and try again.'
									)
								)
								break
							case 500:
							default:
								actions.setStatus(
									c.t(
										'System is currently busy, please wait for 1 minute and try again'
									)
								)
								break
						}
						actions.setSubmitting(false)
					}
				}}
			>
				{({ errors, isSubmitting, dirty, touched, values, status, initialValues }) => (
					<FormikForm>
						<Field
							name='user'
							type='text'
							component={TextField}
							placeholder={c.t('Email/Phone')}
							value={values.user}
							hidden={initialValues['user'] != ''}
						/>
						<Field
							name='password'
							type='password'
							component={TextField}
							placeholder={c.t('Password')}
							value={values.password}
						/>
						<FormErr>{status}</FormErr>
						{!this.state.showResetPassword && (
							<ButtonsWrapper mobile={false}>
								<FormButtonBasic onClick={this.showResetPasswordForm}>
									{c.t('Forget Your Password?')}
								</FormButtonBasic>
							</ButtonsWrapper>
						)}
						<FieldRow>
							<CTAButton
								type='submit'
								disabled={isSubmitting || !isEmpty(pickBy(errors)) || !dirty}
							>
								{c.t('Login')}
							</CTAButton>
						</FieldRow>
						{!this.state.showResetPassword && (
							<ButtonsWrapper mobile={true}>
								<FormButtonBasic onClick={this.goToSignUpPage}>
									{c.t('Sign Up')}
								</FormButtonBasic>
								<FormButtonBasic onClick={this.showResetPasswordForm}>
									{c.t('Forget Your Password?')}
								</FormButtonBasic>
							</ButtonsWrapper>
						)}
					</FormikForm>
				)}
			</Formik>
		)
	}
}

const validateForm = {
	user: ({ user }) =>
		isMobilePhone(user, 'zh-HK') || isEmail(user) ? undefined : 'Must be email or phone number',
	password: ({ password }) => (password.length > 5 ? undefined : 'Need at least 6 characters'),
	isLogined: () => undefined
}

export default LoginForm
