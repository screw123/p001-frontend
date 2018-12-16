import React from "react"
import { ApolloProvider, Mutation } from 'react-apollo'

import { Formik, Field } from 'formik'
import FormikForm, { FieldRow, TextField, FormButton, FormErr } from '../component/FormikForm.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import { verifyNewUser, resendVerification } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import GqlApi from '../stateContainer/GqlApi.js'
import LocaleApi from '../stateContainer/LocaleApi.js'
import moment from 'moment'

class UserActivationForm extends React.Component {
    
    constructor(props) {
        super(props)
        /* props
        user: {_id, verifyDeadline}
        match: {params : {_id, verificationPIN}}
        */
        this.state= {
            expired: false,
            resendCountDown: 0
        }
        this.checkExpired = this.checkExpired.bind(this)
        this.resetCountDown = this.resetCountDown.bind(this)
        if (this.props.user.verifyDeadline) {
            if (moment().isAfter(this.props.user.verifyDeadline)) {
                this.state.expired = true
            }
        }
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
    }
    
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    
    checkExpired(d) {
        if (moment().isAfter(d)) {
            this.setState({expired: true})
        }
    }
    
    tick() {
        this.setState(prevState => (prevState.resendCountDown>0) ? {resendCountDown: prevState.resendCountDown-1} : {resendCountDown: 0})
    }
    
    resetCountDown() {
        this.setState({resendCountDown: 5})
    }
    
    async resendVerificationPIN(mutate, verifyBySMS) {
        try {
            console.log('resendVPIN')
            const uid = this.props.user._id || this.props.match.params._id
            const d = await mutate({variables: {
                _id: uid,
                verifyBySMS: verifyBySMS
            }})
            console.log(d)
            this.resetCountDown()
            return d
        }
        catch(e) { 
            console.log(e)
            //Fixme think and handle possible resend verification errors.
        }
    }
    
    render(){ 
        const resendButton1 = (this.state.resendCountDown!=0) && (<p>{this.state.resendCountDown} mins before press resend again</p>)
        const resendButton2 = (this.state.resendCountDown==0) && (
            <ApolloProvider client={GqlApi.getGqlClientPublic()}>
                <Mutation mutation={resendVerification} errorPolicy="all">
                {(mutate, {loading, err})=>{
                    if (err) { return <p>{LocaleApi.t('Server Error.  Please retry in 1 minute.')}</p> }
                    else{ return(
                    <FieldRow>
                        <FormButton
                            type="button"
                            disabled={loading}
                            onClick={() => this.resendVerificationPIN(mutate, true)}
                        >
                            {LocaleApi.t('Resend by') + ' ' + LocaleApi.t('SMS')}
                        </FormButton>
                        <FormButton
                            type="button"
                            disabled={loading}
                            onClick={() => this.resendVerificationPIN(mutate, false)}
                        >
                            {LocaleApi.t('Resend by') + ' ' + LocaleApi.t('Email')}
                        </FormButton>
                    </FieldRow>)
                }}}
                </Mutation>
            </ApolloProvider>
        )
        
        const inputForm = (
            <ApolloProvider client={GqlApi.getGqlClientPublic()}>
                <Mutation mutation={verifyNewUser} errorPolicy="all">
                {(mutate, {loading, err})=>(
                    <Formik
                        initialValues={{
                            verificationPIN: this.props.user.verificationPIN || this.props.match.params.verificationPIN || '',
                            _id: this.props.user._id || this.props.match.params._id || ''
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
                            const keyArr = Object.keys(validateForm)
                            let haveErr = false
                            for (let i=0; i<keyArr.length; i++) {
                                const f = keyArr[i]
                                const e = validateForm[f](values)
                                if (e !== undefined) {
                                    actions.setFieldError(f, e)
                                    haveErr = true
                                }
                            }
                            if (haveErr) {
                                actions.setSubmitting(false)
                                return
                            }
                            //submit to server
                            try {
                                const d = await mutate({variables: {
                                    _id: values._id,
                                    verificationPIN: values.verificationPIN
                                }})
                                console.log('verify success', d)
                                if (this.props.onVerifySuccess) { 
                                    console.log('call parent"s onVerifySuccess()')
                                    this.props.onVerifySuccess(d.data.verifyNewUser._id)
                                    
                                }
                                
                            } catch(e) { 
                                const errStack = parseApolloErr(e, LocaleApi.t)
                                console.log('errStack = ',errStack, e)
                                for (let i=0; i<errStack.length; i++) {
                                    if (!errStack[i].key) { actions.setStatus(errStack[i].message) }
                                    else {actions.setFieldError(errStack[i].key, errStack[i].message)}
                                }
                                actions.setSubmitting(false)
                            }
                            console.log('submitted to server')
                        }}
                    >
                    {({ errors, handleSubmit, isSubmitting, dirty, touched, values, status }) => (
                        <FormikForm>
                            {this.props.user.verifyDeadline && 
                                <FieldRow>
                                    {LocaleApi.t('Please activate your account within')
                                    + ' : ' 
                                    + LocaleApi.state.moment.duration(moment(this.props.user.verifyDeadline).diff(moment())).humanize()
                                    }
                                </FieldRow>
                            }
                            <Field
                                name="_id"
                                type="text"
                                component={TextField}
                                label={LocaleApi.t('ID')}
                                value={values._id}
                                hidden={(this.props.user._id || this.props.match.params._id)? true: false}
                            />
                            <Field
                                name="verificationPIN"
                                type="text"
                                component={TextField}
                                label={LocaleApi.t('Verification PIN')}
                                value={values.verificationPIN}
                            />
                            <FormErr>{status}</FormErr>
                            <FieldRow>
                                <FormButton
                                    type="submit"
                                    disabled={isSubmitting || !isEmpty(pickBy(errors))}
                                >
                                    {LocaleApi.t('Validate')}
                                </FormButton>
                                
                            </FieldRow>
                            
                        </FormikForm>
                    )}
                    </Formik>
                )}
                </Mutation>
                
            </ApolloProvider>
        )
        
        if (this.state.expired===true) {
            return (
                <div>
                    Expired.  Resend press button.
                    {resendButton1}
                    {resendButton2}
                </div>
            )
        }
        else {
            return(
                <div>
                    {inputForm}
                    {resendButton1}
                    {resendButton2}
                </div>
            )
        }
    }
        
}
    

const validateForm = {
    verificationPIN: ({verificationPIN}) => {
        return ((verificationPIN.length===6) & (Number.isInteger(parseInt(verificationPIN, 10)))) ? 
            undefined : 
            'Verification PIN is invalid.  Please check.'},
    _id: ({_id}) => (_id.length===24)? undefined : 'User ID is invalid.  Please check.  Direct copy and paste will be better than manual key in'
}

export default UserActivationForm