import React from "react"
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'

import TextField from '../component/TextField.js'
import Button from '../component/Button.js'

import request from 'superagent'
import isEmpty from 'lodash/isEmpty'

import { Query } from 'react-apollo'
import { getMyselfRelated } from '../gql/query.js'

const LoginForm = () => (
        <Formik
            initialValues={{
                user:'',
                pw:'',
                isLogined: false
            }}
            validationSchema={yup.object().shape({
                user: yup
                        .string()
                        .required()
                        .test('emailOrPhone', 'Must be email or phone number', (v) => {
                            return isMobilePhone(v, 'zh-HK') || isEmail(v)
                        }),
                pw: yup.string().required().min(6)
            })}
            onSubmit={async (values, actions) => {
                
                const res = await request.post('https://cd.nicecar.hk/l').set({'Access-Control-Allow-Origin': 'https://cd.nicecar.hk'}).withCredentials().type('form').query(values).ok(()=>true)
                if (res.statusCode===200) {
                    actions.setValues({isLogined: true})
                }
                else if (res.statusCode===401){
                    actions.setFieldError('pw', 'Logined failed.  Either your username or password is wrong.')
                }
                else {
                    actions.setFieldError('pw', 'Something wrong with our system. :(')
                }
                actions.setSubmitting(false)
                
            }}
        >
        {({ errors, handleSubmit, handleChange, handleBlur, isSubmitting, dirty, touched, values }) => (
            <div>
                <div>{
                    values.isLogined && 
                    <Query query={getMyselfRelated}>
                        {({ loading, error, data }) => {
                            if (loading) return null
                            if (error) return 'Error :('
                            console.log('data=', data)
                            
                            return (<h1>Hello {data.getMyself.firstName + ' ' + data.getMyself.lastName}!</h1>)
                        }}
                    </Query>
                }</div>
                <div>{
                    !values.isLogined &&
                    <Form>
                        <Field
                            name="user"
                            type="text"
                            component={TextField}
                            label="Email/Phone"
                            value={values.user}
                            onChange={handleChange} onBlur={handleBlur}
                        />
                        <Field
                            name="pw"
                            type="password"
                            component={TextField}
                            label="Password"
                            value={values.pw}
                            onChange={handleChange} onBlur={handleBlur}
                        />   
                        <Button
                            type="submit"
                            disabled={isSubmitting || !isEmpty(errors) || !dirty}
                        >
                            Submit
                        </Button>
                    </Form>
                    
                }</div>
            </div>
        )}
        </Formik>
    )

export default LoginForm