import React from "react"
import { Formik, Field } from 'formik'
import FormikForm, { MultiSelect, TextField, FormButton, FormErr, FormIcon, RadioButtonGroup, RadioButton, CheckBox, InputGroup, DropDown } from '../component/FormikForm.js'
import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import { ApolloProvider, Mutation } from 'react-apollo'
import { updateAddress } from '../gql/query.js'

import GqlApi from '../stateContainer/GqlApi.js'
import parseApolloErr from '../util/parseErr.js'

// Store user address details that come from props
let user = {};

class EditAddressForm extends React.Component {
    constructor(props) {
        super(props)
        this.validate = this.validate.bind(this)
        this.getUserId = this.getUserId.bind(this)
        user = this.props.address;
    }

    //get user_id from GqlApi
    getUserId() {
        this.setState({user_id: this.props.getGqlApiState()});
    }
    
    validate(v) {
        const validateFunc = {
            legalName: ({legalName}) => (legalName.length>0 && legalName.length<255)? undefined : 'Please provide a valid personal/company name',
            streetAddress: ({streetAddress}) => (streetAddress.length>4 && streetAddress.length<500)? undefined : 'Please provide a valid address',
            addressRegion1: ({addressRegion1}) => (addressRegion1.length>0 && addressRegion1.length<50)? undefined : 'Please provide a valid region',
            addressRegion2: ({addressRegion2}) => (addressRegion2.length>0 && addressRegion2.length<50)? undefined : 'Please provide a valid region',
            addressCountry: ({addressCountry}) => (addressCountry && addressCountry.length>0)? undefined : 'Please choose address Country',
            account_id: () => undefined,
            telephone: ({telephone}) => (telephone.length==8)? undefined: 'Please provide a valid phone number'
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

    render(){ return(
        <ApolloProvider client={GqlApi.getGqlClient()}>
            <Mutation mutation={updateAddress} errorPolicy="all">
            {(mutate, {loading, err})=>(
                <I18n>
                {(t) => {
                    if (err) return (<div>{err}</div>)
                    else return(
                    <Formik
                        initialValues={{
                            legalName: user.legalName,
                            addressCountry: user.addressCountry,
                            addressRegion1: user.addressRegion1,
                            addressRegion2: user.addressRegion2,
                            streetAddress: user.streetAddress,
                            telephone: user.telephone,
                            account_id: user.account_id
                        }}
                        validate={this.validate}
                        onSubmit={ async(values, actions) => {
                            actions.setStatus('')

                            //submit to server

                            console.log('validate ok, now submit.');
                            try {
                                const vars = {
                                    account_id: values.account_id,
                                    legalName: values.legalName,
                                    addressCountry: values.addressCountry,
                                    addressRegion1: values.addressRegion1,
                                    addressRegion2: values.addressRegion2,
                                    streetAddress: values.streetAddress,
                                    telephone: values.telephone
                                }
                                console.log('vars=', vars)
                                const d = await mutate({variables: vars})
                                console.log('server return', d)
                                if(this.props.onSubmitSuccess){this.props.onSubmitSuccess(d.data.updateAddress)}
                            } catch(er) { 
                                console.log('submit err', er, er.message)
                                const errStack = parseApolloErr(er, t)
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
                    {({ errors, isSubmitting, dirty, values, status }) => {
                        return (
                            <FormikForm>
                                <Field
                                    name="legalName"
                                    type="text"
                                    component={TextField}
                                    label={t('Organization / Contact Person Name')}
                                    err={errors.legalName}
                                    value={values.legalName}
                                    placeholder="Input your address"
                                />
                                <Field
                                    name="streetAddress"
                                    type="text"
                                    component={TextField}
                                    label={t('Address')}
                                    value={values.streetAddress}
                                    err={errors.streetAddress}
                                />
                                <Field
                                    name="addressRegion1"
                                    type="text"
                                    component={TextField}
                                    label={t('Address Region1')}
                                    value={values.addressRegion1}
                                    err={errors.addressRegion1}
                                    placeholder="First Address Region"
                                />
                                <Field
                                    name="addressRegion2"
                                    type="text"
                                    component={MultiSelect}
                                    label={t('Address Region2')}
                                    value={values.addressRegion2}
                                    err={errors.addressRegion2}
                                    placeholder="Second Address Region"
                                    options={[
                                        {value: t('屯門'), label: t('屯門')},
                                        {value: t('HONG KONG ISLAND'), label: t('HONG KONG ISLAND')},
                                        {value: t('NEW TERRITORIES'), label: t('NEW TERRITORIES')},
                                        {value: t('LANTAU'), label: t('LANTAU')}
                                    ]}
                                />
                                <Field
                                    name="addressCountry"
                                    type="text"
                                    component={MultiSelect}
                                    label={t('Address Country')}
                                    value={values.addressCountry}
                                    err={errors.addressCountry}
                                    options={[
                                        {value: t('KOWLOON'), label: t('KOWLOON')},
                                        {value: t('HONG KONG ISLAND'), label: t('HONG KONG ISLAND')},
                                        {value: t('NEW TERRITORIES'), label: t('NEW TERRITORIES')},
                                        {value: t('LANTAU'), label: t('LANTAU')}
                                    ]}
                                />
                                <Field
                                    name="telephone"
                                    type="text"
                                    component={TextField}
                                    label={t('Phone')}
                                    value={values.telephone}
                                    err={errors.telephone}
                                />
                                <FormButton
                                    type="submit"
                                    disabled={!dirty || isSubmitting || !isEmpty(pickBy(errors)) || loading }
                                    >
                                        {t('Submit')}
                                </FormButton>
                                <FormErr>{status && status.form}</FormErr>
                                
                            </FormikForm>
                        )}
                    }
                    </Formik>)
                }}
                </I18n>
            )}
            </Mutation>
        </ApolloProvider>
    )}
    
}

export default EditAddressForm