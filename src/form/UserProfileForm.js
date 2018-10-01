import React from "react"
import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FormIcon } from '../component/FormikForm.js'
import {StraightRow } from '../component/Background.js'

import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import { ApolloProvider, Mutation } from 'react-apollo'
import { updateUserDetails } from '../gql/query.js'
import { I18n } from 'react-i18next'

import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import passwordTest from '../util/passwordTest.js'

import parseApolloErr from '../util/parseErr.js'

class UserProfileForm extends React.Component {  
    constructor(props) {
        super(props)
        this.state={
            showExPw: false,
            showNwPw: false
        }
        this.toggleShowExPw = this.toggleShowExPw.bind(this)
        this.toggleShowNwPw = this.toggleShowNwPw.bind(this)
    }
    
    toggleShowExPw() {
        if (this.state.showExPw===false) { this.setState({showExPw: true}) }
        else { this.setState({showExPw: false})}
    }
    toggleShowNwPw() {
        if (this.state.showNwPw===false) { this.setState({showNwPw: true}) }
        else { this.setState({showNwPw: false})}
    }

    validate(v) {
        const validateFunc = {
            firstName: ({firstName}) => (firstName.length>0)? undefined : 'Please enter your First Name',
            lastName: ({lastName}) => (lastName.length>0)? undefined : 'Please enter your Last Name',
            email: ({email}) => isEmail(email)? undefined : 'Please enter valid email address',
            mobilePhone: ({mobilePhone}) => isMobilePhone(mobilePhone, 'zh-HK')? undefined : 'Please enter Hong Kong mobile phone number',
            newPassword: ({newPassword}) => (passwordTest(newPassword))? undefined : 'Need at least 8 characters, with both uppercase and lowercase',
            //existingPassword: ({existingPassword}) => (passwordTest(existingPassword))? undefined : 'Need at least 8 characters, with both uppercase and lowercase'
            existingPassword: () => {return undefined}
        }
        const keyArr = Object.keys(v)
        let err = {}
        for (let i=0; i<keyArr.length; i++) {
            const f = keyArr[i]
            const e = validateFunc[keyArr[i]](v)
            err[f] = e
        }
        return omitBy(err, isUndefined)
    }

    render() {return (
        <ApolloProvider client={GqlApi.getGqlClient()}> 
            <Mutation mutation={updateUserDetails} errorPolicy="all">
            {(mutate, {loading, err})=>(
                <I18n>
                {(t) => (
                    <GqlApiSubscriber>
                    {(c) => (
                        <Formik
                            initialValues={{
                                email: c.state.myself.email,
                                newPassword:'',
                                existingPassword: '',
                                firstName: c.state.myself.firstName,
                                lastName: c.state.myself.lastName,
                                mobilePhone: c.state.myself.mobilePhone
                            }}
                            validate={this.validate}
                            onSubmit={ async(values, actions) => {
                                actions.setStatus('')
                                //submit to server
                                console.log('validate ok, now submit')
                                try {
                                    const vars = {
                                        firstName: values.firstName,
                                        lastName: values.lastName,
                                        existingPassword: values.existingPassword,
                                        newPassword: values.newPassword
                                    }
                                    console.log('vars=', vars)
                                    const d = await mutate({variables: vars})
                                    console.log('server return', d)
                                    // Update user details using await 
                                    // After getting the result from backend, update it in GqlApi
                                    const result = await d.data.updateUserDetails
                                    GqlApi.updateMyself(result)
                                } catch(e) { 
                                    console.log('submit err', e)
                                    const errStack = parseApolloErr(e, t)
                                    console.log('errStack=', errStack)
                                    for (let i=0; i<errStack.length; i++) {
                                        if (errStack[i].key) { 
                                            console.log('err key =', errStack[i].key)
                                            
                                            actions.setFieldError(errStack[i].key, errStack[i].message)
                                        }
                                        else {
                                            actions.setStatus(errStack[i].message)
                                        }
                                    }
                                    actions.setSubmitting(false)
                                }
                            }}
    
                            
                        >
                        {({ errors, dirty, values, status }) => {
                        return (
                            <FormikForm>
                                <Field
                                    name="firstName"
                                    type="text"
                                    component={TextField}
                                    label={t('First Name')}
                                    err={errors.firstName}
                                    value={values.firstName}
                                />
                                <Field
                                    name="lastName"
                                    type="text"
                                    component={TextField}
                                    label={t('Last Name')}
                                    value={values.lastName}
                                    err={errors.lastName}
                                />
                                <Field
                                    name="email"
                                    type="text"
                                    component={TextField}
                                    label={t('Email')}
                                    value={values.email}
                                    err={errors.email}
                                    readOnly
                                />
                                <Field
                                    name="mobilePhone"
                                    type="text"
                                    component={TextField}
                                    label={t('Hong Kong Mobile Number')}
                                    value={values.mobilePhone}
                                    err={errors.mobilePhone}
                                    readOnly
                                />
                                <Field
                                    name="existingPassword"
                                    type={(this.state.showExPw)? 'text': 'password'}
                                    component={TextField}
                                    label={t('Existing Password')}
                                    placeholder={t('8 characters with uppercase and lowercase letters')}
                                    value={values.existingPassword}
                                    err={errors.existingPassword}
                                    rightIcon={[<FormIcon icon={(this.state.showExPw)? 'eye': 'eye-slash'} key="showExPw" onClick={ this.toggleShowExPw}/>]}
                                />
                                <Field
                                    name="newPassword"
                                    type={(this.state.showNwPw)? 'text': 'password'}
                                    component={TextField}
                                    label={t('New Password')}
                                    placeholder={t('8 characters with uppercase and lowercase letters')}
                                    value= {values.newPassword}
                                    err={errors.newPassword}
                                    rightIcon={[<FormIcon icon={(this.state.showNwPw)? 'eye': 'eye-slash'} key="showNwPw" onClick={ this.toggleShowNwPw}/>]}
                                />
                                <FormButton
                                    type="submit"
                                    disabled={!dirty}
                                    >
                                    <StraightRow>
                                        {t('Submit')}
                                    </StraightRow>
                                </FormButton>
                                <FormErr>{status && status.form}</FormErr>
    
                            </FormikForm>
                        )}}
                        </Formik>
                    )}
                    </GqlApiSubscriber>
                )}
                </I18n>
            )}
            </Mutation>
        </ApolloProvider>
        
        )
    }

}

export default UserProfileForm;