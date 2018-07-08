import React from "react"
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import FormikForm, { TextField, FormButton, FormErr } from '../component/FormikForm.js'
import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import { ApolloProvider, Query, Mutation } from 'react-apollo'
import { addUser } from '../gql/query.js'

import GqlApi from '../container/GqlApi.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import parseApolloErr from '../util/parseErr.js'

const SignUpForm = () => (
    <ApolloProvider client={GqlApi.getGqlClientPublic()}>
        <Mutation mutation={addUser} errorPolicy="all">
        {(mutate, {loading, err})=>(
            <I18n>
            {(t) => (
                <Formik
                    initialValues={{
                        email:'',
                        password:'',
                        pw_again:'',
                        firstName: '',
                        lastName: '',
                        mobilePhone: ''
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
                        const keyArr = Object.keys(validateForm)
                        let haveErr = false
                        for (let i=0; i<keyArr.length; i++) {
                            const f = keyArr[i]
                            const e = validateForm[f](values)
                            if (e !== undefined) {
                                actions.setFieldError(f, e)
                                haveErr = true
                            }
                        }
                        if (haveErr) { actions.setSubmitting(false) }
                        else {
                            //submit to server
                            try {
                                const d = await mutate({variables: {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    email: values.email,
                                    password: values.password,
                                    mobilePhone: values.mobilePhone
                                }})
                                console.log(d)
                            } catch(e) { 
                                const errStack = parseApolloErr(e, t)
                                for (let i=0; i<errStack.length; i++) {
                                    if (errStack[i].key) { actions.setStatus(errStack[i].message) }
                                    else {actions.setFieldError(errStack[i].key, errStack[i].message)}
                                }
                                actions.setSubmitting(false)
                            }
                            
                            console.log('submitted to server')
                        }
                        
                    }}
                >
                {({ errors, isSubmitting, values, dirty, status, setStatus }) => (
                    <div>
                        <FormikForm>
                            <Field
                                name="firstName"
                                type="text"
                                component={TextField}
                                label="First Name"
                                value={values.firstName}
                            />
                            <Field
                                name="lastName"
                                type="text"
                                component={TextField}
                                label="Last Name"
                                value={values.lastName}
                            />
                            <Field
                                name="email"
                                type="text"
                                component={TextField}
                                label="Email"
                                value={values.email}
                            />
                            <Field
                                name="mobilePhone"
                                type="text"
                                component={TextField}
                                label="Hong Kong Mobile Number"
                                value={values.mobilePhone}
                                
                            />
                            <Field
                                name="password"
                                type={(status['password']['showPw'])? 'text': 'password'}
                                component={TextField}
                                label="Password (8 characters with uppercase and lowercase letters)"
                                value={values.password}
                                rightIcon={[<FontAwesomeIcon icon="eye-slash" onClick={()=> {
                                    let s = status
                                    s['password']['showPw'] = (s['password']['showPw']) ? false: true
                                    setStatus(s)
                                }}/>]}
                            />
                            <Field
                                name="pw_again"
                                type="password"
                                component={TextField}
                                label="Confirm Password"
                                value={values.pw_again}
                            />
                            <FormErr>{status.form}</FormErr>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting || !isEmpty(pickBy(errors)) || !dirty }
                                value="Submit"
                            >
                                Submit
                            </FormButton>
                        </FormikForm>
                    </div>
                )}
                </Formik>
            )}
            </I18n>
        )}
        </Mutation>
    </ApolloProvider>
)

const validateForm = {
    firstName: ({firstName}) => (firstName.length>0)? undefined : 'Please enter your First Name',
    lastName: ({lastName}) => (lastName.length>0)? undefined : 'Please enter your Last Name',
    email: ({email}) => isEmail(email)? undefined : 'Please enter valid email address',
    mobilePhone: ({mobilePhone}) => isMobilePhone(mobilePhone, 'zh-HK')? undefined : 'Please enter Hong Kong mobile phone number',
    password: ({password}) => (password.length>7)? undefined : 'Need at least 8 characters'
}


export default SignUpForm