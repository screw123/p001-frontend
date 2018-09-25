import React from "react"
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import FormikForm, { TextField, FormButton, FormErr, FormIcon, RadioButtonGroup, RadioButton, CheckBox, InputGroup, DropDown } from '../component/FormikForm.js'
import Select from 'react-select'

import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import merge from 'lodash/merge'

import { Mutation } from 'react-apollo'
import { addAddress } from '../gql/query.js'

import GqlApi from '../stateContainer/GqlApi.js'
import LocaleApi from '../stateContainer/LocaleApi.js'
import parseApolloErr from '../util/parseErr.js'

class AddNewAddressForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.validate = this.validate.bind(this)
    }
    
    validate(v) {
        const validateFunc = {
            legalName: ({legalName}) => (legalName.length>0)? undefined : 'Please provide a name',
            streetAddress: ({streetAddress}) => (streetAddress.length>9)? undefined : 'Please provide a valid address',
            addressRegion1: () => undefined,
            addressRegion2: () => undefined,
            addressType: () => undefined,
            addressCountry: () => undefined,
            account_id: () => undefined,
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
    
    
    
    render(){return(
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
                    console.log('validate ok, now submit.')
                    
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
                    />
                    <Field
                        name="streetAddress"
                        type="text"
                        component={TextField}
                        label={t('Address')}
                        value={values.streetAddress}
                        err={errors.streetAddress}
                    />
                    <Select
                        options={[
                            {value: t('KOWLOON'), label: t('KOWLOON')},
                            {value: t('HONG KONG ISLAND'), label: t('HONG KONG ISLAND')},
                            {value: t('NEW TERRITORIES'), label: t('NEW TERRITORIES')},
                            {value: t('LANTAU'), label: t('LANTAU')}
                        ]}
                        onChange={v => setFieldValue('addressRegion1', v.value)}
                        value={values.addressRegion1}
                    />
                    <Select
                        options={[
                            {value: t('TSIM SHA TSUI'), label: t('TSIM SHA TSUI')},
                            {value: t('TUEN MUN'), label: t('TUEN MUN')}
                        ]}
                        onChange={v => setFieldValue('addressRegion2', v.value)}
                        value={values.addressRegion2}
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
            )}}
            </Formik>
        )}
        </I18n>
    )}
    </Mutation>
    )}
    
}

export default AddNewAddressForm