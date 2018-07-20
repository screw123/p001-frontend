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
import GqlApi from '../container/GqlApi.js'
import LocaleApi from '../container/LocaleApi.js'

class PasswordResetForm extends React.PureComponent {

    render() { return (
        <ApolloProvider client={GqlApi.getGqlClientPublic()}>
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
                            const d = await mutate({variables: {
                                login: values.login,
                            }})
                            console.log('verify success', d)
                            if (this.props.onResetSuccess) { 
                                console.log('call parent"s onResetSuccess()')
                                this.props.onResetSuccess()
                            }
                            
                        } catch(e) { 
                            const errStack = parseApolloErr(e, LocaleApi.t)
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
                            label={LocaleApi.t('Email/Phone')}
                            value={values.login}
                        />
                        <FormErr>{status}</FormErr>
                        <FieldRow>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting || !isEmpty(pickBy(errors))}
                            >
                                {LocaleApi.t('Submit')}
                            </FormButton>
                            
                        </FieldRow>
                        
                    </FormikForm>
                )}
                </Formik>
            )}
            </Mutation>
        </ApolloProvider>
    )}
}
    
const validateForm = {
    user: ({user}) => (isMobilePhone(user, 'zh-HK') || isEmail(user)) ? undefined: 'Must be email or phone number'
}

export default PasswordResetForm