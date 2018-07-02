import React from "react"
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import FormikForm, { TextField, FormButton } from '../component/FormikForm.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import { ApolloProvider, Query, Mutation } from 'react-apollo'
import { addUser } from '../gql/query.js'

import GqlApi,{ GqlApiSubscriber } from '../container/GqlApi.js'

const SignUpForm = () => (
    <ApolloProvider client={GqlApi.getGqlClientPublic()}>
        <Mutation mutation={addUser}>
        {(mutate, {loading, err})=>(
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
                        } catch(e) { console.log(e) }
                        if (err) {
                            console.log(err)
                        }
                        console.log('submitted to server')
                    }
                    
                }}
            >
            {({ errors, handleSubmit, isSubmitting, isValid, touched, values, dirty }) => (
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
                            type="password"
                            component={TextField}
                            label="Password (6+ characters)"
                            value={values.password}
                        />
                        <Field
                            name="pw_again"
                            type="password"
                            component={TextField}
                            label="Confirm Password"
                            value={values.pw_again}
                        />
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
        </Mutation>
    </ApolloProvider>
)

const validateForm = {
    firstName: ({firstName}) => (firstName.length>0)? undefined : 'Please enter your First Name',
    lastName: ({lastName}) => (lastName.length>0)? undefined : 'Please enter your Last Name',
    email: ({email}) => isEmail(email)? undefined : 'Please enter valid email address',
    mobilePhone: ({mobilePhone}) => isMobilePhone(mobilePhone, 'zh-HK')? undefined : 'Please enter Hong Kong mobile phone number',
    password: ({password}) => (password.length>5)? undefined : 'Need at least 6 characters',
    pw_again: ({pw_again, password}) => (pw_again==password)? undefined : 'Password does not match'
}


export default SignUpForm