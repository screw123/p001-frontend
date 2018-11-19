import React from "react"

import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FieldRow } from '../component/FormikForm.js'
import { I18n } from 'react-i18next'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
import ResetPasswordForm from './ResetPasswordForm.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js'


class LoginForm extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state={showResetPassword: false}
        this.showResetPasswordForm=this.showResetPasswordForm.bind(this)
        this.onResetSucess=this.onResetSucess.bind(this)
    }
    showResetPasswordForm = ()=> this.setState({showResetPassword: true})
    onResetSucess = ()=> this.setState({showResetPassword: false})

    //props= user object
    render() { 
        const g = this.props.login
        const c = this.props.i18n
        return(
            <Formik
                initialValues={{
                    user: this.props.user._id || this.props.user.email || this.props.user.mobilePhone || '',
                    password:''
                }}
                validate={ (values) => {
                    const keyArr = Object.keys(validateForm)
                    let err = {}
                    for (let i=0; i<keyArr.length; i++) {
                        const f = keyArr[i]
                        const e = validateForm[f](values)
                        if (e !== undefined) { err[f] = e }
                    }
                    return err
                }}
                onSubmit={async (values, actions) => {
                    actions.setStatus('')
                    const isLoginSuccess = await g.login({user: values.user, password: values.password})
                    if (isLoginSuccess===true) {
                        if (this.props.onLoginSuccess) { this.props.onLoginSuccess() }
                    }
                    else {
                        switch (isLoginSuccess) {
                            case 401:
                                actions.setFieldError('password', c.t('Email/Phone or password error.  Please check and try again.'))
                                break
                            case 500:
                            default:
                                actions.setStatus(c.t('System is currently busy, please wait for 1 minute and try again'))
                                break
                        }
                        actions.setSubmitting(false)
                    }
                }}
            >
            {({ errors, isSubmitting, dirty, touched, values, status, initialValues }) => (
                <div>
                    <FormikForm>
                        <Field
                            name="user"
                            type="text"
                            component={TextField}
                            label={c.t('Email/Phone')}
                            value={values.user}
                            hidden={(initialValues['user'] != '')}
                        />
                        <Field
                            name="password"
                            type="password"
                            component={TextField}
                            label={c.t('Password')}
                            value={values.password}
                        />
                        <FormErr>{status}</FormErr>
                        <FieldRow>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting || !isEmpty(pickBy(errors)) || !dirty}
                            >
                                { c.t('Submit')}
                            </FormButton>
                            {!this.state.showResetPassword && <FormButton
                                type="button"
                                onClick={this.showResetPasswordForm}
                            >
                                { c.t('Forget Your Password?')}
                            </FormButton>}
                        </FieldRow>
                        
                    </FormikForm>
                    {this.state.showResetPassword && 
                        <div>
                            <h2>{c.t('Reset Your Password')}</h2>
                            <ResetPasswordForm onResetSucess={()=>this.onResetSucess} />
                        </div>
                    }
                </div>
            )}
            </Formik>
    )}
}

const validateForm = {
    user: ({user}) => (isMobilePhone(user, 'zh-HK') || isEmail(user)) ? undefined: 'Must be email or phone number',
    password: ({password}) => (password.length>5)? undefined : 'Need at least 6 characters',
    isLogined: ()=>undefined
}

export default LoginForm