import React from "react"
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
import FormikForm, { TextField, FormButton, FormErr, FormIcon, CheckBox2, MultiSelect } from '../component/FormikForm.js'
import TermsAndConditionPage from '../page/TermsAndConditionPage.js'
import Modal from '../component/Modal.js'
import {StraightRow, ClickableText } from '../component/BasicComponents.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import merge from 'lodash/merge'

import { ApolloProvider, Mutation } from 'react-apollo'
import { addUser } from '../gql/query.js'

import parseApolloErr from '../util/parseErr.js'
import passwordTest from '../util/passwordTest.js'

class SignUpForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state={
            showPw: false,
            showTC: false,
        }
        this.toggleShowPw = this.toggleShowPw.bind(this)
        this.toggleShowTC = this.toggleShowTC.bind(this)
        this.validate = this.validate.bind(this)
    }
    
    toggleShowPw() {
        if (this.state.showPw===false) { this.setState({showPw: true}) }
        else { this.setState({showPw: false})}
    }
    
    toggleShowTC() {
        if (this.state.showTC===false) { this.setState({showTC: true}) }
        else { this.setState({showTC: false})}
    }
    
    validate(v) {
        const validateFunc = {
            firstName: ({firstName}) => (firstName.length>0)? undefined : 'Please enter your First Name',
            lastName: ({lastName}) => (lastName.length>0)? undefined : 'Please enter your Last Name',
            email: ({email}) => isEmail(email)? undefined : 'Please enter valid email address',
            mobilePhone: ({mobilePhone}) => isMobilePhone(mobilePhone, 'zh-HK')? undefined : 'Please enter Hong Kong mobile phone number',
            password: ({password}) => (passwordTest(password))? undefined : 'Need at least 8 characters, with both uppercase and lowercase',
            verifyBySMS: ({verifyBySMS}) => (['Email','SMS'].includes(verifyBySMS))? undefined: 'Please choose a way to verify your account',
            agreeTerms: ({agreeTerms}) => (agreeTerms) ? undefined : 'Please read and agree on our Terms and Condition before proceed'
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
        const g = this.props.login
        const c = this.props.i18n
        return(
            <ApolloProvider client={g.getGqlClientPublic()}>
                <Mutation mutation={addUser} errorPolicy="all">
                {(mutate, {loading, err})=>(
                    <Formik
                        initialValues={{
                            email:'',
                            password:'',
                            firstName: '',
                            lastName: '',
                            mobilePhone: '',
                            verifyBySMS: 'Email',
                            agreeTerms: false,
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
                                    email: values.email,
                                    password: values.password,
                                    mobilePhone: values.mobilePhone,
                                    verifyBySMS: (values.verifyBySMS==='SMS')? true: false,
                                    language: c.getCurrentLangForGql()
                                }
                                console.log('vars=', vars)
                                const d = await mutate({variables: vars})
                                console.log('server return', d)
                                if (this.props.onUserCreated) { this.props.onUserCreated(merge({password: values.password}, d.data.addUser)) }
                            } catch(e) { 
                                console.log('submit err', e)
                                const errStack = parseApolloErr(e, c.t)
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
                    {({ errors, handleSubmit, setValues, isSubmitting, touched, values, status }) => {
                    return (
                        <FormikForm>
                            <Field
                                name="firstName"
                                type="text"
                                component={TextField}
                                label={c.t('First Name')}
                                err={errors.firstName}
                                value={values.firstName}
                            />
                            <Field
                                name="lastName"
                                type="text"
                                component={TextField}
                                label={c.t('Last Name')}
                                value={values.lastName}
                                err={errors.lastName}
                            />
                            <Field
                                name="email"
                                type="text"
                                component={TextField}
                                label={c.t('Email')}
                                value={values.email}
                                err={errors.email}
                            />
                            <Field
                                name="mobilePhone"
                                type="text"
                                component={TextField}
                                label={c.t('Hong Kong Mobile Number')}
                                value={values.mobilePhone}
                                err={errors.mobilePhone}
                            />
                            <Field
                                name="password"
                                type={(this.state.showPw)? 'text': 'password'}
                                component={TextField}
                                label={c.t('Password')}
                                placeholder={c.t('8 characters with uppercase and lowercase letters')}
                                value={values.password}
                                err={errors.password}
                                rightIcon={[<FormIcon icon={(this.state.showPw)? 'eye': 'eye-slash'} key="showPw" onClick={ this.toggleShowPw}/>]}
                            />
                            <Field
                                name="verifyBySMS"
                                component={MultiSelect}
                                label={c.t('How do you want to verify your account?')}
                                value={values.verifyBySMS}
                                err={errors.verifyBySMS}
                                options={[{value: 'Email', label: 'Email'}, {value: 'SMS', label: 'SMS'}]}
                            />
                            <Field
                                component={CheckBox2}
                                name="agreeTerms"
                                value="agreeTerms"
                                key="agreeTerms"
                                checked={values.agreeTerms===true}
                                err={errors.agreeTerms}
                            >
                                <div>
                                    {c.t("I have already review and agree on ")}
                                    <ClickableText onClick={this.toggleShowTC}>
                                        {c.t('Terms of Condition')}
                                    </ClickableText>
                                </div>
                            </Field>
                            
                            <FormErr>{status && status.form}</FormErr>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting || !isEmpty(pickBy(errors)) || loading }
                            >
                                <StraightRow>
                                    {c.t('Submit')}
                                    
                                </StraightRow>
                            </FormButton>
                            <Modal
                                show={this.state.showTC}
                                component={<TermsAndConditionPage/>}
                                title={c.t('Terms and Conditions')}
                                footerButtons={[
                                    <FormButton type="button" key='agree' onClick={()=> {
                                        setValues({agreeTerms: true})
                                        this.toggleShowTC()
                                    }}>
                                        {c.t('I Agree')}
                                    </FormButton>,
                                    <FormButton type="button" key='disagree' onClick={()=> {
                                        setValues({agreeTerms: false})
                                        this.toggleShowTC()
                                    }}>
                                        {c.t('I Disagree')}
                                    </FormButton>
                                ]}
                            />
                        </FormikForm>
                    )}}
                    </Formik>
                )}
                </Mutation>
            </ApolloProvider>
        )
    }
    
}

export default SignUpForm