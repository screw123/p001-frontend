import React from 'react'
import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FormTag} from '../component/FormikForm.js'
import get from 'lodash/get'
import styled from "styled-components"

import parseApolloErr from '../util/parseErr.js'

import SelectAddress from "../component/SelectAddress"
import SelectCreditCard from "../component/SelectCreditCard"

import {ToolTip} from '../component/BasicComponents.js'

class EditAccountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showEditAddress: false }
	}

	handleEditAddress = () => {
		this.setState({ showEditAddress: !this.state.showEditAddress })
	}

  // validate(v) {
  //     const validateFunc = {
  //         legalName: ({legalName}) => (legalName.length>0 && legalName.length<255)? undefined : 'Please provide a valid personal/company name',
  //         streetAddress: ({streetAddress}) => (streetAddress.length>4 && streetAddress.length<500)? undefined : 'Please provide a valid address',
  //         addressRegion1: ({addressRegion1}) => (addressRegion1.length>0 && addressRegion1.length<50)? undefined : 'Please provide a valid region',
  //         addressRegion2: ({addressRegion2}) => (addressRegion2.length>0 && addressRegion2.length<50)? undefined : 'Please provide a valid region',
  //         addressCountry: ({addressCountry}) => (addressCountry && addressCountry.length>0)? undefined : 'Please choose address Country',
  //         account_id: () => undefined,
  //         _id: () => undefined,
  //         disable: () => undefined,
  //         telephone: ({telephone}) => (telephone.length==8)? undefined: 'Please provide a valid phone number'
  //     }
  //     const keyArr = Object.keys(v)
  //     let err = {}
  //     for (let i=0; i<keyArr.length; i++) {
  //         const f = keyArr[i]
  //         const e = validateFunc[keyArr[i]](v)
  //         err[f] = e
  //     }
  //     return omitBy(err, isUndefined)
  // }

	render() {
        const g = this.props.login
        const c = this.props.i18n
        const account = this.props.account
        const readonly = this.props.mode==='view'

        console.log('props=', this.props)
		return (

            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: account.name,
                    accountType: account.accountType,
                    selectedAddress: get(account, 'address_id[0]._id', undefined),
                    lastUpdate: c.moment(account.updateDateTime).calendar()
                }}

                // validate={this.validate}
                onSubmit={async (values) => {
                    //submit to server
                    console.log('validate ok, now submit.');
                }}
            >
            {({ values, status, setFieldValue, errors }) => (
                <FormikForm>
                    <Field
                        name="name"
                        type="text"
                        component={TextField}
                        label={'Name'}
                        // err={errors.legalName}
                        value={values.name}
                        placeholder="Name"
                        disabled={readonly}
                    // ignoreTouch={true}
                    />
                    <Field
                        name="accoutType"
                        type="text"
                        component={FormTag}
                        label={'Account Type'}
                        background={(values.accountType==='PERSONAL')? 'LightGreen': 'RoyalBlue'}
                        value={values.accountType}
                    />
                    <Field
                        name="selectedAddress"
                        type="text"
                        disabled={readonly}
                        component={SelectAddress}
                        label={'Addresses'}
                        value={values.selectedAddress}
                        placeholder={c.t('You have no addresses with us')}
                        account_id= {account._id}
                        addresses={account.address_id}
                        defaultShippingAddress_id={account.defaultShippingAddress_id._id}
                        defaultBillingAddress_id={account.defaultBillingAddress_id._id}
                        onChange={(v)=>setFieldValue('selectedAddress', v._id)}
                        allowAddAddress={true}
                        allowEditAddress={true}
                        onAddressUpdate={()=>this.props.onInfoUpdate()}
                        multiSelect={false}
                        err={errors['selectedAddress']}
                    />
                    <Field
                        name="cardId"
                        type="text"
                        component={SelectCreditCard}
                        label={c.t('Credit Card')}
                        placeholder={c.t('Select a credit card to update/remove')}
                        account={this.props.account}
                        onChange={(v)=>setFieldValue('card_id', v.cardId)}
                        allowAddCard={true}
                        allowRemoveCard={true}
                        onAddCard={()=>this.props.onInfoUpdate()}
                        multiSelect={false}
                        isLoading={this.props.gqlNetworkStatus===4}
                        err={errors['cardId']}
                    />
                    <Field
                        name="lastUpdate"
                        type="text"
                        component={TextField}
                        label={'Last update'}
                        value={values.lastUpdate}
                        disabled
                    />
                    <FormButton
                        type="submit"
                    // disabled={!dirty || isSubmitting || !isEmpty(pickBy(errors))}
                    >
                        Submit
                    </FormButton>
                    <FormErr>{status && status.form}</FormErr>

                </FormikForm>
            )}
            </Formik>
        )
	}
}

export default EditAccountForm