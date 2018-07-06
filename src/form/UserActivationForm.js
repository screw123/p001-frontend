import React from "react"
import { ApolloProvider, Mutation } from 'react-apollo'

import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr } from '../component/FormikForm.js'

import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import { verifyUser } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import GqlApi from '../container/GqlApi.js'


class UserActivationForm extends React.Component {
    
    render(){ return(
        <ApolloProvider client={GqlApi.getGqlClientPublic()}>
            <Mutation mutation={verifyUser} errorPolicy="all">
            {(mutate, {loading, err})=>(
                <I18n>
                {(t) => (
                    <Formik
                        initialValues={{
                            verificationPIN: this.props.match.params.verificationPIN || '',
                            _id: this.props.match.params._id || ''
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
                                console.log(d)
                            } catch(e) { 
                                const errStack = parseApolloErr(e, t)
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
                                label="ID"
                                value={values._id}
                                disabled={(this.props.match.params.verificationPIN)? true: false}
                            />
                            <Field
                                name="verificationPIN"
                                type="text"
                                component={TextField}
                                label="Verification PIN"
                                value={values.verificationPIN}
                            />
                            <FormErr>{status}</FormErr>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting || !isEmpty(pickBy(errors))}
                            >
                                {t('Validate')}
                            </FormButton>
                            
                        </FormikForm>
                    )}
                    </Formik>
                )}
                </I18n>
            )}
            </Mutation>
        </ApolloProvider>
    )}
}
    

const validateForm = {
    verificationPIN: ({verificationPIN}) => {
        return ((verificationPIN.length===6) & (Number.isInteger(parseInt(verificationPIN, 10)))) ? 
            undefined : 
            'Verification PIN is invalid.  Please check.'},
    _id: ({_id}) => (_id.length===24)? undefined : 'User ID is invalid.  Please check.  Direct copy and paste will be better than manual key in'
}

export default UserActivationForm