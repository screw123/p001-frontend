import React from "react"
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import FormikForm, { TextField, FormButton } from '../component/FormikForm.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

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
                    const e = validateForm[f](values[f])
                    if (e !== undefined) {
                        actions.setFieldError(f, e)
                        haveErr = true
                    }
                }
                if (haveErr) { actions.setSubmitting(false) }
                else {
                    //submit to server
                    console.log('submit to server')
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