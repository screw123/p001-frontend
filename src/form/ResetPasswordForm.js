import React from "react"
import { ApolloProvider, Mutation } from 'react-apollo'

import { Formik, Field } from 'formik'
import FormikForm, { FieldRow, TextField, FormButton, FormErr } from '../component/FormikForm.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import { resetPassword } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import GqlApi from '../stateContainer/GqlApi.js'
import { I18n } from 'react-i18next'

class PasswordResetForm extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state={resetDone: false, passwordSendTo: ''}
        this.setResetDone = this.setResetDone.bind(this)
    }
    setResetDone = (target)=> this.setState({resetDone: true, passwordSendTo: target})

    render() { return (
        <I18n>
        {(t)=>(<div>
            {!this.state.resetDone && <ApolloProvider client={GqlApi.getGqlClientPublic()}>
                <Mutation mutation={resetPassword} errorPolicy="all">
                {(mutate, {loading, err})=>(
                    <Formik
                        initialValues={{
                            login: ''
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
                            //submit to server
                            try {
                                console.log('prepare to submit')
                                const d = await mutate({variables: {
                                    login: values.login,
                                }})
                                console.log('verify success', d)
                                if (this.props.onResetSuccess) { 
                                    console.log('call parent"s onResetSuccess()')
                                    this.props.onResetSuccess()
                                    
                                }
                                this.setResetDone((d.data.resetPassword.verifyBySMS)? 'SMS': 'Email')
                                
                            } catch(e) { 
                                const errStack = parseApolloErr(e, t)
                                console.log('errStack = ',errStack, e)
                                for (let i=0; i<errStack.length; i++) {
                                    if (!errStack[i].key) { actions.setStatus(errStack[i].message) }
                                    else {actions.setFieldError(errStack[i].key, errStack[i].message)}
                                }
                                actions.setSubmitting(false)
                            }
                            console.log('submitted to server')
                        }}
                    >
                    {({ errors, isSubmitting, touched, values, status }) => (
                        <FormikForm>
                            <Field
                                name="login"
                                type="text"
                                component={TextField}
                                label={t('Email/Phone')}
                                value={values.login}
                            />
                            <FormErr>{status}</FormErr>
                            <FieldRow>
                                <FormButton
                                    type="submit"
                                    disabled={isSubmitting || !isEmpty(pickBy(errors))}
                                >
                                    {t('Submit')}
                                </FormButton>
                                
                            </FieldRow>
                            
                        </FormikForm>
                    )}
                    </Formik>
                )}
                </Mutation>
            </ApolloProvider>}
            {this.state.resetDone && <p>{t('Reset is done.  Your should receive your password shortly by') + ' ' + t(this.state.passwordSendTo)}</p>}
            
        </div>)}
        </I18n>
    )}
}
    
const validateForm = {
    user: ({login}) => (isMobilePhone(login, 'zh-HK') || isEmail(login)) ? undefined: 'Must be email or phone number'
}

export default PasswordResetForm