import React from "react"
import { Formik, Field } from 'formik'
import FormikForm, { MultiSelect, TextField, FormButton, FormErr, CheckBox2 } from '../component/FormikForm.js'
import {Tag, ClickableText} from '../component/BasicComponents.js'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import { ApolloProvider, Mutation } from 'react-apollo'
import { addAddress, updateAddress } from '../gql/query.js'

import {GqlApiSubscriber} from '../stateContainer/GqlApi.js'
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import parseApolloErr from '../util/parseErr.js'

import SystemError from '../component/SystemError.js'

/*
If passed account_id only, =add mode
if passed account_id and address object = edit/view mode
Missing account_id will show error
This component will not load address from backend, parent need to provide address object

*/

class EditAddressForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.validate = this.validate.bind(this)
    }
    
    validate(v) {
        const validateFunc = {
            legalName: ({legalName}) => (legalName.length>0 && legalName.length<255)? undefined : 'Please provide a valid personal/company name',
            streetAddress: ({streetAddress}) => (streetAddress.length>4 && streetAddress.length<500)? undefined : 'Please provide a valid address',
            addressRegion1: ({addressRegion1}) => (addressRegion1.length>0 && addressRegion1.length<50)? undefined : 'Please provide a valid region',
            addressRegion2: ({addressRegion2}) => (addressRegion2.length>0 && addressRegion2.length<50)? undefined : 'Please provide a valid region',
            addressCountry: ({addressCountry}) => (addressCountry && addressCountry.length>0)? undefined : 'Please choose address Country',
            addressType: () => undefined,
            account_id: () => undefined,
            _id: () => undefined,
            setDefaultBilling: () => undefined,
            setDefaultShipping: () => undefined,
            defaultBillingAddress: () => undefined,
            defaultShippingAddress: () => undefined,
            label: () => undefined,
            value: () => undefined,
            __typename: () => undefined,
            telephone: ({telephone}) => (telephone.length==8)? undefined: 'Please provide a valid phone number'
        }
        const keyArr = Object.keys(v)
        let err = {}
        for (let i=0; i<keyArr.length; i++) {
            const f = keyArr[i]
            console.log('validating f=', f)
            const e = validateFunc[keyArr[i]](v)
            err[f] = e
        }
        return omitBy(err, isUndefined)
    }

    render(){ 
        if (!this.props.account_id) {
            return(<SystemError message={'Account ID is missing'}/>)
        }
        
        let initValues
        if (this.props.mode==='add') {
            initValues = {
                legalName: '',
                addressCountry: ' ',
                addressRegion1: '',
                addressRegion2: '',
                streetAddress: '',
                telephone: '',
                account_id: this.props.account_id,
                setDefaultBilling: false,
                setDefaultShipping: false
            }
        }
        else {
            initValues = {...this.props.address}
            initValues['account_id'] = this.props.account_id
            initValues['setDefaultBilling'] = false
            initValues['setDefaultShipping'] = false
        }
        
        return(
        <GqlApiSubscriber>
        {g=>(
            <LocaleApiSubscriber>
            {c=>(
                <ApolloProvider client={g.getGqlClient()}>
                    <Mutation mutation={(this.props.mode==='add')? addAddress: updateAddress} errorPolicy="all">
                    {(mutate, {loading, err})=>{
                        if (err) return (<div>{err}</div>)
                        else return(
                        <Formik
                            initialValues={initValues}
                            validate={this.validate}
                            onSubmit={ async(values, actions) => {
                                actions.setStatus('')
    
                                //submit to server
    
                                console.log('validate ok, now submit.');
                                try {
                                    let vars = {
                                        account_id: this.props.account_id,
                                        legalName: values.legalName,
                                        addressCountry: values.addressCountry,
                                        addressRegion1: values.addressRegion1,
                                        addressRegion2: values.addressRegion2,
                                        streetAddress: values.streetAddress,
                                        telephone: values.telephone
                                    }
                                    if (this.props.mode==='edit') {vars['_id'] = values._id}
                                    if (values.setDefaultBilling) { vars['setDefaultBilling'] = true }
                                    if (values.setDefaultShipping) { vars['setDefaultShipping'] = true }

                                    console.log('vars=', vars)
                                    const d = await mutate({variables: vars})
                                    console.log('server return', d)
                                    if(this.props.onSubmitSuccess) {
                                        actions.resetForm({})
                                        this.props.onSubmitSuccess(d.data.addAddress)
                                    }
                                } catch(er) { 
                                    console.log('submit err', er, er.message)
                                    const errStack = parseApolloErr(er, c.t)
                                    console.log('errStack=', errStack)
                                    for (let i=0; i<errStack.length; i++) {
                                        if (errStack[i].key) { actions.setFieldError(errStack[i].key, errStack[i].message) }
                                        else { actions.setStatus(errStack[i].message) }
                                    }
                                    actions.setSubmitting(false)
                                }
                            }}                    
                        >
                        {({ errors, isSubmitting, touched, values, status }) => {
                            return (
                                <FormikForm>
                                    {this.props.address.defaultBillingAddress && 
                                        <Tag float='left'>{c.t('Default Billing')}</Tag>
                                    }
                                    {this.props.address.defaultShippingAddress && 
                                        <Tag float='left'>{c.t('Default Shipping')}</Tag>
                                    }
                                    <Field
                                        name="legalName"
                                        type="text"
                                        component={TextField}
                                        label={c.t('Organization / Contact Person Name')}
                                        err={errors.legalName}
                                        value={values.legalName}
                                        placeholder="Input your address"
                                    />
                                    <Field
                                        name="streetAddress"
                                        type="text"
                                        component={TextField}
                                        label={c.t('Address')}
                                        value={values.streetAddress}
                                        err={errors.streetAddress}
                                    />
                                    <Field
                                        name="addressRegion1"
                                        type="text"
                                        component={TextField}
                                        label={c.t('Address Region1')}
                                        value={values.addressRegion1}
                                        err={errors.addressRegion1}
                                        placeholder="First Address Region"
                                    />
                                    <Field
                                        name="addressRegion2"
                                        type="text"
                                        component={TextField}
                                        label={c.t('Address Region2')}
                                        value={values.addressRegion2}
                                        err={errors.addressRegion2}
                                        placeholder="Second Address Region"
                                    />
                                    <Field
                                        name="addressCountry"
                                        type="text"
                                        component={MultiSelect}
                                        label={c.t('Address Country')}
                                        value={values.addressCountry}
                                        err={errors.addressCountry}
                                        options={[
                                            {value: c.t('KOWLOON'), label: c.t('KOWLOON')},
                                            {value: c.t('HONG KONG ISLAND'), label: c.t('HONG KONG ISLAND')},
                                            {value: c.t('NEW TERRITORIES'), label: c.t('NEW TERRITORIES')},
                                            {value: c.t('LANTAU'), label: c.t('LANTAU')}
                                        ]}
                                    />
                                    <Field
                                        name="telephone"
                                        type="text"
                                        component={TextField}
                                        label={c.t('Phone')}
                                        value={values.telephone}
                                        err={errors.telephone}
                                    />
                                    {!this.props.address.defaultBillingAddress && 
                                        <Field
                                            component={CheckBox2}
                                            name="setDefaultBilling"
                                            value="setDefaultBilling"
                                            key="setDefaultBilling"
                                            checked={values.setDefaultBilling===true}
                                            err={errors.setDefaultBilling}
                                        >
                                            <ClickableText>
                                                {c.t('Set this as default billing address')}
                                            </ClickableText>
                                        </Field>
                                    }
                                    {!this.props.address.defaultShippingAddress && 
                                        <Field
                                            component={CheckBox2}
                                            name="setDefaultShipping"
                                            value="setDefaultShipping"
                                            key="setDefaultShipping"
                                            checked={values.setDefaultShipping===true}
                                            err={errors.setDefaultShipping}
                                        >
                                            <ClickableText>
                                                {c.t('Set this as default shipping address')}
                                            </ClickableText>
                                        </Field>
                                    }
                                    <FormErr>{status && status.form}</FormErr>
                                    <FormButton
                                        type="submit"
                                        disabled={isSubmitting || !isEmpty(pickBy(errors)) || loading }
                                    >
                                            {c.t('Submit')}
                                    </FormButton>
                                    
                                </FormikForm>
                            )}
                        }
                        </Formik>)
                    }}
                    </Mutation>
                </ApolloProvider>
            )}
            </LocaleApiSubscriber>
        )}
        </GqlApiSubscriber>
        
    )}
    
}

export default EditAddressForm