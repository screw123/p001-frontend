import React from "react"
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
import FormikForm, { TextField, FormButton, FormErr, FormIcon, RadioButtonGroup, RadioButton, CheckBox, InputGroup } from '../component/FormikForm.js'
import TermsAndConditionPage from '../page/TermsAndConditionPage.js'
import Modal from '../component/Modal.js'
import {StraightRow, ClickableText } from '../component/Background.js'

import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import { ApolloProvider, Mutation } from 'react-apollo'
import { addUser } from '../gql/query.js'

import GqlApi from '../container/GqlApi.js'
import LocaleApi from '../container/LocaleApi.js'
import parseApolloErr from '../util/parseErr.js'

class NewAccountForm extends React.Component {
    
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
    
    
    
    render(){return(
    <ApolloProvider client={GqlApi.getGqlClientPublic()}>
        <Mutation mutation={addUser} errorPolicy="all">
        {(mutate, {loading, err})=>(
            <I18n>
            {(t) => (
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
                            const d = await mutate({variables: {
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                password: values.password,
                                mobilePhone: values.mobilePhone,
                                verifyBySMS: values.verifyBySMS,
                                language: LocaleApi.state.i18n.language
                            }})
                            console.log('server return', d)
                            if (this.props.onUserCreated) { this.props.onUserCreated(d.data.addUser) }
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
                {({ errors, handleSubmit, setValues, isSubmitting, dirty, touched, values, status }) => {
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
                        />
                        <Field
                            name="mobilePhone"
                            type="text"
                            component={TextField}
                            label={t('Hong Kong Mobile Number')}
                            value={values.mobilePhone}
                            err={errors.mobilePhone}
                        />
                        <Field
                            name="password"
                            type={(this.state.showPw)? 'text': 'password'}
                            component={TextField}
                            label={t('Password')}
                            placeholder={t('8 characters with uppercase and lowercase letters')}
                            value={values.password}
                            err={errors.password}
                            rightIcon={[<FormIcon icon={(this.state.showPw)? 'eye': 'eye-slash'} key="showPw" onClick={ this.toggleShowPw}/>]}
                        />
                        <RadioButtonGroup
                            name="verifyBySMS"
                            label={t('How do you want to verify your account?')}
                            value={values.verifyBySMS}
                            err={errors.verifyBySMS}
                            touched={touched}
                        >
                            <Field
                                component={RadioButton}
                                name="verifyBySMS"
                                value="SMS"
                                label="SMS"
                                checked={values.verifyBySMS==="SMS"}
                            />
                            <Field
                                component={RadioButton}
                                name="verifyBySMS"
                                value="Email"
                                label="Email"
                                checked={values.verifyBySMS==="Email"}
                            />
                        </RadioButtonGroup>
                        <InputGroup>
                        <Field
                            component={CheckBox}
                            name="agreeTerms"
                            value="agreeTerms"
                            key="agreeTerms"
                            checked={values.agreeTerms===true}
                            err={errors.agreeTerms}
                        >
                            <div>
                                {t("I have already review and agree on ")}
                                <ClickableText onClick={this.toggleShowTC}>
                                    {t('Terms of Condition')}
                                </ClickableText>
                            </div>
                        </Field>
                        
                        </InputGroup>
                        <FormErr>{status && status.form}</FormErr>
                        <FormButton
                            type="submit"
                            disabled={isSubmitting || !isEmpty(pickBy(errors)) || loading }
                        >
                            <StraightRow>
                                {t('Submit')}
                                
                            </StraightRow>
                        </FormButton>
                        <Modal
                            show={this.state.showTC}
                            component={<TermsAndConditionPage/>}
                            title={t('Terms and Conditions')}
                            footerButtons={[
                                <FormButton type="button" key='agree' onClick={()=> {
                                    setValues({agreeTerms: true})
                                    this.toggleShowTC()
                                }}>
                                    {t('I Agree')}
                                </FormButton>,
                                <FormButton type="button" key='disagree' onClick={()=> {
                                    setValues({agreeTerms: false})
                                    this.toggleShowTC()
                                }}>
                                    {t('I Disagree')}
                                </FormButton>
                            ]}
                        />
                    </FormikForm>
                )}}
                </Formik>
            )}
            </I18n>
        )}
        </Mutation>
    </ApolloProvider>
    )}
    
}

export default NewAccountForm