import React from "react"

import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr } from '../component/FormikForm.js'
import { I18n } from 'react-i18next'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import { GqlApiSubscriber } from '../container/GqlApi.js'


const LoginForm = () => (
        <GqlApiSubscriber>
        {(q) => (
            <I18n>
            {(t) => (
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
                        actions.setStatus('')
                        const isLoginSuccess = await q.login({user: values.user, password: values.password})
                        if (isLoginSuccess===true) {
                            return
                        }
                        else {
                            switch (isLoginSuccess) {
                                case 401:
                                    actions.setFieldError('password', t('Email/Phone or password error.  Please check and try again.'))
                                    break
                                case 500:
                                default:
                                    actions.setStatus(t('System is currently busy, please wait for 1 minute and try again'))
                                    break
                            }
                            actions.setSubmitting(false)
                        }
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
                            { t('Submit')}
                        </FormButton>
                        
                    </FormikForm>
                )}
                </Formik>
            )}
            </I18n>
        )}
        </GqlApiSubscriber>
    )

const validateForm = {
    user: ({user}) => (isMobilePhone(user, 'zh-HK') || isEmail(user)) ? undefined: 'Must be email or phone number',
    password: ({password}) => (password.length>5)? undefined : 'Need at least 6 characters',
    isLogined: ()=>undefined
}

export default LoginForm