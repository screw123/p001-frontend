import React from 'react'
import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr} from '../component/FormikForm.js'
import get from 'lodash/get'
import styled from "styled-components"

import { ApolloProvider, Mutation } from 'react-apollo'

import parseApolloErr from '../util/parseErr.js'

import SelectAddress from "../component/SelectAddress"
import EditAddressForm from "./EditAddressForm"
import SelectCreditCard from "../component/SelectCreditCard"

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
        console.log('props=', this.props)
		return (

            <Formik
                enableReinitialize={true}
                initialValues={{
                    name: account.name,
                    accountType: account.accountType,
                    selectedAddress: account.address_id[0],
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
                    // ignoreTouch={true}
                    />
                    <Field
                        name="accoutType"
                        type="text"
                        component={TextField}
                        label={'Account Type'}
                        disabled
                        value={values.accountType}
                    />
                    <Field
                        name="selectedAddress"
                        type="text"
                        component={SelectAddress}
                        label={'Addresses'}
                        value={values.selectedAddress}
                        placeholder={c.t('You have no addresses with us')}
                        account_id= {account._id}
                        addresses={account.address_id}
                        onChange={(v)=>setFieldValue('selectedAddress', v._id)}
                        allowAddAddress={true}
                        onAddNewAddress={()=>console.log('refetch')}
                        multiSelect={false}
                        err={errors['selectedAddress']}
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