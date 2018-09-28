import React from "react"
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import FormikForm, { MultiSelect, TextField, FormButton, FormErr, FormIcon, RadioButtonGroup, RadioButton, CheckBox, InputGroup, DropDown } from '../component/FormikForm.js'
import Select from 'react-select'
import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import merge from 'lodash/merge'

import { ApolloProvider, Mutation } from 'react-apollo'
import { addAddress } from '../gql/query.js'

import GqlApi from '../stateContainer/GqlApi.js'
import LocaleApi from '../stateContainer/LocaleApi.js'
import parseApolloErr from '../util/parseErr.js'

class AddNewAddressForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.validate = this.validate.bind(this)
        this.getUserId = this.getUserId.bind(this)
    }

    //get user_id from GqlApi
    getUserId() {
        this.setState({user_id: this.props.getGqlApiState()});
    }
    
    validate(v) {
            const validateFunc = {
            legalName: ({legalName}) => (legalName.length>0)? undefined : 'Please provide a name',
            legalName: ({legalName}) => (legalName.length<255)? undefined : 'Please provide name less than 25',
            streetAddress: ({streetAddress}) => (streetAddress.length>0)? undefined : 'Please provide a valid address',
            streetAddress: ({streetAddress}) => (streetAddress.length<500)? undefined : 'Please provide street address less than 500',
            addressRegion1: ({addressRegion1}) => (addressRegion1.length>0)? undefined : 'Please provide a valid first region',
            addressRegion1: ({addressRegion1}) => (addressRegion1.length<50)? undefined : 'Please provide first region less than 50',
            addressRegion2: ({addressRegion2}) => (addressRegion2.length>0)? undefined : 'Please provide a valid second region',
            addressRegion2: ({addressRegion2}) => (addressRegion2.length<50)? undefined : 'Please provide second region less than 50',
            addressType: () => undefined,
            addressCountry: () => undefined,
            account_id: () => undefined,
            telephone: ({telephone}) => (telephone.length>0)? undefined: 'Please provide a valid phone number',
            telephone: ({telephone}) => isMobilePhone(telephone, 'zh-HK')? undefined : 'Please enter Hong Kong mobile phone number',
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

    render(){    
        //get gqlapi.state.myself._id
        //console.log(this.props.getGqlApiState().myself._id);    
        //get account address list from fetch query graphql with getQuotationById
        console.log(this.props.account_id)

        //get address multiple options
        const addressOptions = ((addressItems) => {
            var addressOptionData = [];
            addressItems.map((addressItem)=>{
                addressOptionData.push({
                    value: addressItem.legalName,
                    label: addressItem.legalName
                });
            });
            console.log(addressOptionData);
            return addressOptionData;
        });

        const addressidlist = ((addressItems) => {
            var idarray = [];
            addressItems.map((addressItem) => {
                idarray.push(addressItem._id)
            })
            console.log(idarray);
            return idarray;
        })

    return(
    <ApolloProvider client={GqlApi.getGqlClientPublic()}>
        <Mutation mutation={addAddress} errorPolicy="all">
        {(mutate, {loading, err})=>(
            <I18n>
            {(t) => (
                <Formik
                    initialValues={{
                        addressType: 'CUSTOMER',
                        legalName: '',
                        addressCountry: t('HONG KONG'),
                        addressRegion1: '',
                        addressRegion2: '',
                        streetAddress: '',
                        telephone: '',
                        account_id: this.props.account_id
                    }}
                    validate={this.validate}
                    onSubmit={ async(values, actions) => {
                        actions.setStatus('')

                        //submit to server

                        console.log('validate ok, now submit.');
                        try {
                            const vars = {
                                addressType: values.addressType,
                                legalName: values.legalName,
                                addressCountry: values.addressCountry,
                                addressRegion1: values.addressRegion1,
                                addressRegion2: values.addressRegion2,
                                streetAddress: values.streetAddress,
                                telephone: values.telephone,
                            }
                            console.log('vars=', vars)
                            const d = await mutate({variables: vars})
                            console.log('server return', d)
                            if(this.props.onSubmit){this.props.onSubmit(d.data.addAddress)}
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
                {({ errors, setFieldValue, handleSubmit, setValues, isSubmitting, touched, values, status }) => {
                    
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
                                component={MultiSelect}
                                label={t('Address')}
                                value={values.value}
                                MultiSelect = {true}
                                options={addressOptions(this.props.addressItems)}
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
                                component={TextField}
                                label={t('Address Region2')}
                                value={values.addressRegion2}
                                err={errors.addressRegion2}
                                placeholder="Second Address Region"
                            />
        
                            <Field
                                name="telephone"
                                type="text"
                                component={TextField}
                                label={t('Phone')}
                                value={values.telephone}
                                err={errors.telephone}
                            />
                            <FormErr>{status && status.form}</FormErr>
                            <FormButton
                                type="submit"
                                disabled={isSubmitting || !isEmpty(pickBy(errors)) || loading }
                            >
                                    {t('Submit')}
                            </FormButton>
                            
                        </FormikForm>
                    )}
                }
                </Formik>
            )}
            </I18n>
        )}
        </Mutation>
        </ApolloProvider>
    )}
    
}

export default AddNewAddressForm