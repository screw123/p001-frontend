import React from "react"

import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr } from '../component/FormikForm.js'

import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import request from 'superagent'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import { getMyself } from '../gql/query.js'
import { GqlApiSubscriber } from '../container/GqlApi.js'


const LoginForm = () => (
        <GqlApiSubscriber>
        {(q) => (
            <Formik
                initialValues={{
                    user:'',
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
                    try {
                        actions.setStatus('')
                        const res = await request.post('https://cd.nicecar.hk/l').withCredentials().type('form').query(values).ok(()=>true)
                        if (res.statusCode===200) {
                            console.log('login success')
                            q.setLogined(true)
                            return
                        }
                        else if (res.statusCode===401){
                            actions.setFieldError('password', 'Logined failed.  Either your username or password is wrong.')
                        }
                        else {
                            actions.setStatus('Something wrong with our system. ;(')
                        }
                    } catch(e) {
                    console.log(e)
                        actions.setStatus('Something wrong with our system. ;(')
                    }
                    actions.setSubmitting(false)
                    
                }}
            >
            {({ errors, handleSubmit, isSubmitting, dirty, touched, values, status }) => (
                <FormikForm>
                    <Field
                        name="user"
                        type="text"
                        component={TextField}
                        label="Email/Phone"
                        value={values.user}
                    />
                    <Field
                        name="password"
                        type="password"
                        component={TextField}
                        label="Password"
                        value={values.password}
                    />
                    <FormErr>{status}</FormErr>
                    <FormButton
                        type="submit"
                        disabled={isSubmitting || !isEmpty(pickBy(errors)) || !dirty}
                    >
                        Submit
                    </FormButton>
                    
                </FormikForm>
            )}
            </Formik>
        )}
        </GqlApiSubscriber>
    )

const validateForm = {
    user: ({user}) => (isMobilePhone(user, 'zh-HK') || isEmail(user)) ? undefined: 'Must be email or phone number',
    password: ({password}) => (password.length>5)? undefined : 'Need at least 6 characters',
    isLogined: ()=>undefined
}

const test = (errors) => {
                            console.log('errors=',errors)
                            console.log('pickby=',pickBy(errors))
                            console.log('isempty=', isEmpty(pickBy(errors)))
                        }
export default LoginForm