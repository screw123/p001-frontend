import React from "react"
import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FormIcon } from '../component/FormikForm.js'
import {StraightRow } from '../component/Background.js'

import GqlApi from '../stateContainer/GqlApi.js'
import { ApolloProvider, Mutation } from 'react-apollo'
import { updateUserDetails } from '../gql/query.js'


class UserProfileForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state={
            user: {},
            showPw: false
        }
        this.toggleShowPw = this.toggleShowPw.bind(this)
    }

    //Get User Info
    componentDidMount() {
        this.setState({user: GqlApi.state.myself})
    }
    
    toggleShowPw() {
        if (this.state.showPw===false) { this.setState({showPw: true}) }
        else { this.setState({showPw: false})}
    }

    validate(v) {
        const validateFunc = {
            firstName: ({firstName}) => (firstName.length>0)? undefined : 'Please enter your First Name',
            lastName: ({lastName}) => (lastName.length>0)? undefined : 'Please enter your Last Name',
            newPassword: ({newPassword}) => (passwordTest(newPassword))? undefined : 'Need at least 8 characters, with both uppercase and lowercase'
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

    render() {
        return (
            <ApolloProvider client={GqlApi.getGqlClient()}> 
            <Mutation mutation={updateUserDetails} errorPolicy="all">
            {(mutate, {loading, err})=>(
                <I18n>
                {(t) => (
                    <Formik
                        initialValues={{
                            email: this.state.user.email,
                            password:'',
                            firstName: this.state.user.firstName,
                            lastName: this.state.user.lastName,
                            mobilePhone: this.state.user.mobilePhone
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
                    {({ errors, dirty, isSubmitting, values, status }) => {
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
                                type={(this.state.showPw)? 'text': 'password'}
                                component={TextField}
                                label={t('Existing Password')}
                                placeholder={t('8 characters with uppercase and lowercase letters')}
                                value={values.password}
                                err={errors.password}
                                rightIcon={[<FormIcon icon={(this.state.showPw)? 'eye': 'eye-slash'} key="showPw" onClick={ this.toggleShowPw}/>]}
                            />
                            <Field
                                name="newPassword"
                                type={(this.state.showPw)? 'text': 'password'}
                                component={TextField}
                                label={t('New Password')}
                                placeholder={t('8 characters with uppercase and lowercase letters')}
                                value={values.password}
                                err={errors.password}
                                rightIcon={[<FormIcon icon={(this.state.showPw)? 'eye': 'eye-slash'} key="showPw" onClick={ this.toggleShowPw}/>]}
                            />
                            <FormErr>{status && status.form}</FormErr>
                            <FormButton
                                type="submit"
                                disabled={!dirty || isSubmitting || !isEmpty(pickBy(errors)) || loading }
                            >
                                <StraightRow>
                                    {t('Submit')}
                                </StraightRow>
                            </FormButton>

                        </FormikForm>
                    )}}
                    </Formik>
                )}
                </I18n>
            )}
            </Mutation>
        </ApolloProvider>
        
        )
    }

}

export default UserProfileForm;