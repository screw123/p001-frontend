import React from "react"
import { ApolloProvider, Mutation } from 'react-apollo'

import { Formik, Field } from 'formik'
import FormikForm, { FieldRow, TextField, FormButton, FormErr } from '../component/FormikForm.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import { verifyUser, resendVerification } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import GqlApi from '../container/GqlApi.js'
import LocaleApi from '../container/LocaleApi.js'
import moment from 'moment'

class UserActivationForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.state= {
            now: ((this.props.user.verifyDeadline) ? LocaleApi.moment() : null)
        }
    }
    
    componentDidMount() {
        if (this.props.user.verifyDeadline) {
            this.interval = setInterval(() => this.tick(), 1000)
        }
    }

    componentWillUnmount() {
        if (this.props.user.verifyDeadline) {
            clearInterval(this.interval)
        }
    }
    
    tick() {
        this.setState({now: LocaleApi.moment() })
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
            return d
        }
        catch(e) { 
            console.log(e)
            //Fixme think and handle possible resend verification errors.
        }
    }
    
    render(){ 
        if (this.state.now) {
            if (!this.state.now.isBefore(this.props.user.verifyDeadline)) {
                return (
                    <ApolloProvider client={GqlApi.getGqlClientPublic()}>
                        <Mutation mutation={resendVerification} errorPolicy="all">
                        {(mutate, {loading, err})=>{
                            if (err) { return <p>{LocaleApi.t('Server Error.  Please retry in 1 minute.')}</p> }
                            else{ return(
                            <div>Expired.  Resend press button.
                                <FormButton
                                    type="button"
                                    disabled={loading}
                                    onClick={() => this.resendVerificationPIN(mutate, true)}
                                >
                                    {LocaleApi.t('Resend by SMS')}
                                </FormButton>
                                <FormButton
                                    type="button"
                                    disabled={loading}
                                    onClick={() => this.resendVerificationPIN(mutate, false)}
                                >
                                    {LocaleApi.t('Resend by Email')}
                                </FormButton>
                            </div>)
                        }}}
                        </Mutation>
                    </ApolloProvider>
                )
            }
        }
        
        return(
            <ApolloProvider client={GqlApi.getGqlClientPublic()}>
                <Mutation mutation={verifyUser} errorPolicy="all">
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
                                if (this.props.onUserVerified) { this.props.onUserVerified() }
                                
                            } catch(e) { 
                                const errStack = parseApolloErr(e, LocaleApi.t)
                                for (let i=0; i<errStack.length; i++) {
                                    if (errStack[i].key) { actions.setStatus(errStack[i].message) }
                                    else {actions.setFieldError(errStack[i].key, errStack[i].message)}
                                }
                                actions.setSubmitting(false)
                            }
                            console.log('submitted to server')
                        }}
                    >
                    {({ errors, handleSubmit, isSubmitting, dirty, touched, values, status }) => (
                        <FormikForm>
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
                            {this.state.now && 
                                <FieldRow>
                                    {LocaleApi.t('Please activate your account within')
                                    + ' : ' 
                                    + LocaleApi.state.moment.duration(moment(this.props.user.verifyDeadline).diff(moment())).humanize()
                                    }
                                </FieldRow>
                            }
                            <FormErr>{status}</FormErr>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting || !isEmpty(pickBy(errors))}
                            >
                                {LocaleApi.t('Validate')}
                            </FormButton>
                            
                        </FormikForm>
                    )}
                    </Formik>
                )}
                </Mutation>
                
            </ApolloProvider>
        )
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