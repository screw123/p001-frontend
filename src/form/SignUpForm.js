import React from "react"
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import TextField from '../component/TextField'
import Button from '../component/Button.js'

import isEmpty from 'lodash/isEmpty'
import { Query } from 'react-apollo'
import { getMyselfRelated } from '../gql/query.js'

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
            validationSchema={yup.object().shape({
                email: yup
                        .string()
                        .required()
                        .test('isEmail', 'Must be valid email', (v) => {
                            return isEmail(v)
                        }),
                password: yup.string().required().min(6),
                pw_again: yup.string().required('Password confirm is required').oneOf([yup.ref('password'), null]),
                firstName: yup.string().required().min(1),
                lastName: yup.string().required().min(1),
                mobilePhone: yup.string().required().test('isMobilePhone', 'Must be Hong Kong phone number', (v) => {
                        return isMobilePhone(v, 'zh-HK')
                }),
            })}
            onSubmit={async (values, actions) => {
                
                actions.setSubmitting(false)
                
            }}
        >
        {({ errors, handleSubmit, handleChange, handleBlur, isSubmitting, dirty, touched, values }) => (
            <div>
                <Form>
                    <Field
                        name="firstName"
                        type="text"
                        component={TextField}
                        label="First Name"
                        value={values.firstName}
                        onChange={handleChange} onBlur={handleBlur}
                    />
                    <Field
                        name="lastName"
                        type="text"
                        component={TextField}
                        label="Last Name"
                        value={values.lastName}
                        onChange={handleChange} onBlur={handleBlur}
                    />
                    <Field
                        name="email"
                        type="text"
                        component={TextField}
                        label="Email"
                        value={values.email}
                        onChange={handleChange} onBlur={handleBlur}
                    />
                    <Field
                        name="mobilePhone"
                        type="text"
                        component={TextField}
                        label="Hong Kong Mobile Phone Number"
                        value={values.mobilePhone}
                        onChange={handleChange} onBlur={handleBlur}
                    />
                    <Field
                        name="password"
                        type="password"
                        component={TextField}
                        label="Password (6+ characters)"
                        value={values.password}
                        onChange={handleChange} onBlur={handleBlur}
                    />
                    <Field
                        name="pw_again"
                        type="password"
                        component={TextField}
                        label="Please type your password again"
                        value={values.pw_again}
                        onChange={handleChange} onBlur={handleBlur}
                    />
                    <Button
                        type="submit"
                        disabled={isSubmitting || !isEmpty(errors) || !dirty}
                    >
                        Submit
                    </Button>
                </Form>
            </div>
        )}
        </Formik>
    )

export default SignUpForm