import React from "react"
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import FormikForm, { TextField, FormButton } from '../component/FormikForm.js'

import isEmpty from 'lodash/isEmpty'
import { Query } from 'react-apollo'
import { getMyselfRelated } from '../gql/query.js'

import pickBy from 'lodash/pickBy'

const SignUpForm = () => (
        <Formik
            initialValues={{
                email:'',
                password:'',
                pw_again:'',
                firstName: '',
                lastName: '',
                mobilePhone: ''
            }}

            onSubmit={async (values, actions) => {
                
                actions.setSubmitting(false)
                
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
                        validate={(v) => (v.length>0)? undefined : 'Please enter your First Name' }
                    />
                    <Field
                        name="lastName"
                        type="text"
                        component={TextField}
                        label="Last Name"
                        value={values.lastName}
                        validate={(v) => (v.length>0)? undefined : 'Please enter your Last Name' }
                    />
                    <Field
                        name="email"
                        type="text"
                        component={TextField}
                        label="Email"
                        value={values.email}
                        validate={(v) => isEmail(v)? undefined : 'Please enter valid email address' }
                    />
                    <Field
                        name="mobilePhone"
                        type="text"
                        component={TextField}
                        label="Hong Kong Mobile Number"
                        value={values.mobilePhone}
                        validate={(v) => isMobilePhone(v, 'zh-HK')? undefined : 'Please enter Hong Kong mobile phone number' }
                    />
                    <Field
                        name="password"
                        type="password"
                        component={TextField}
                        label="Password (6+ characters)"
                        value={values.password}
                        validate={(v) => {
                            console.log(v, ((v.length>5)? undefined : 'Need at least 6 characters'))
                            return ((v.length>5)? undefined : 'Need at least 6 characters')
                        } }
                    />
                    <Field
                        name="pw_again"
                        type="password"
                        component={TextField}
                        label="Confirm Password"
                        value={values.pw_again}
                        validate={(v) => {
                            console.log('touched?=',isEmpty(pickBy(touched,v=> v===undefined)))
                            console.log(touched)

                            return ((v==values.password)? undefined : 'Password does not match')
                            
                        } }
                    />
                    <FormButton
                        type="submit"
                        disabled={isSubmitting || (isEmpty(pickBy(touched,v=> v===undefined)) & isEmpty(pickBy(errors)))}
                    >
                        Submit
                    </FormButton>
                </FormikForm>
            </div>
        )}
        </Formik>
    )

export default SignUpForm