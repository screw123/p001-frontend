import React from "react"
import { Formik, Field } from 'formik'
import FormikForm, { MultiSelect, TextField, FormButton, FormErr, FormIcon, RadioButtonGroup, RadioButton, CheckBox, InputGroup, DropDown } from '../component/FormikForm.js'
import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import styled from "styled-components"

import { ApolloProvider, Mutation } from 'react-apollo'
import { updateAddress } from '../gql/query.js'

import GqlApi from '../stateContainer/GqlApi.js'
import parseApolloErr from '../util/parseErr.js'

import SelectAddress from "../component/SelectAddress"
import EditAddressForm from "./EditAddressForm"
import SelectCreditCard from "../component/SelectCreditCard"

const EAB = styled.button`
`
const ECCB = styled.button`
`

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
    let account = this.props.account;
    let selectAddressProps = {
      allowAddAddress: true,
      account_id: account._id,
      placeholder: "XXX",
      addresses: account.address_id,
      onAddNewAddress: "XXX",
      field: { value: "XXX", name: "XXX" },
      form: { setFieldValue: ("XXX") }
    }

    let editAddressFormProps = {
      address: {
        "_id": "5ba0b52cec46627f7930b9ba",
        "legalName": "My Office",
        "addressCountry": "Hong Kong",
        "streetAddress": "Flat B2, 3/F, Ching Cheong Ind. Bldg., 1 Kwai Cheong Rd,",
        "addressRegion1": "So Kwun Wat",
        "addressRegion2": "屯門",
        "telephone": "99911122",
        "account_id": "5b518c4c031c7d0179e23b6a",
        "isActive": true,
        "addressType": "CUSTOMER",
        "creationDateTime": "2018-09-18T08:19:56.673Z",
        "updateDateTime": "2018-09-18T08:19:56.673Z"
      }
    }

    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: account.name,
          accountType: account.accountType,
          address_id: '',
          stripeCustomerObject: '',
          creationDate: account.updateDateTime
        }}
        // validate={this.validate}
        onSubmit={async (values) => {
          //submit to server
          console.log('validate ok, now submit.');

          try {
            const vars = {
              name: values.name,
              accountType: values.accountType,
              address_id: values.address_id,
              stripeCustomerObject: values.stripeCustomerObject,
              creationDate: values.creationDate
            }
            console.log('vars=', vars)
          } catch (er) {
            console.log('submit err', er, er.message)
          }
        }}
      >
        {({ values, status }) => {
          return (
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
              // err={errors.streetAddress}
              // ignoreTouch={true}
              />

              <SelectAddress {...selectAddressProps} />
              {this.state.showEditAddress ? <EditAddressForm {...editAddressFormProps} /> :
                <EAB onClick={() => { this.handleEditAddress() }}>Edit Address</EAB>}

              <SelectCreditCard />
              <ECCB>Edit Credit Card</ECCB>

              <Field
                name="creationDate"
                type="text"
                component={TextField}
                label={'Creation Date'}
                value={values.creationDate}
                disabled
              // err={errors.telephone}
              // ignoreTouch={true}
              />
              <FormButton
                type="submit"
              // disabled={!dirty || isSubmitting || !isEmpty(pickBy(errors))}
              >
                Submit
              </FormButton>
              <FormErr>{status && status.form}</FormErr>

            </FormikForm>
          )
        }
        }
      </Formik>
    )
  }

}

export default EditAccountForm