import React from "react"
import { Formik, Field } from 'formik'
import isMobilePhone from 'validator/lib/isMobilePhone'
import FormikForm, { TextField, FormButton, FormErr, FormIcon, RadioButtonGroup, RadioButton, CheckBox, InputGroup, DropDown } from '../component/FormikForm.js'

import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import merge from 'lodash/merge'

import { Mutation } from 'react-apollo'
import { addAddress } from '../gql/query.js'

import GqlApi from '../container/GqlApi.js'
import LocaleApi from '../container/LocaleApi.js'
import parseApolloErr from '../util/parseErr.js'
import passwordTest from '../util/passwordTest.js'

class AddNewAddressForm extends React.Component {
    
    constructor(props) {
        super(props)
        this.validate = this.validate.bind(this)
    }
    
    validate(v) {
        const validateFunc = {
            firstName: ({firstName}) => (firstName.length>0)? undefined : 'Please enter your First Name',
            lastName: ({lastName}) => (lastName.length>0)? undefined : 'Please enter your Last Name',
            mobilePhone: ({mobilePhone}) => isMobilePhone(mobilePhone, 'zh-HK')? undefined : 'Please enter Hong Kong mobile phone number',
            password: ({password}) => (passwordTest(password))? undefined : 'Need at least 8 characters, with both uppercase and lowercase',
            verifyBySMS: ({verifyBySMS}) => (['Email','SMS'].includes(verifyBySMS))? undefined: 'Please choose a way to verify your account',
            agreeTerms: ({agreeTerms}) => (agreeTerms) ? undefined : 'Please read and agree on our Terms and Condition before proceed'
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
                    console.log('validate ok, now submit')
                    
                }}
                
            >
            {({ errors, handleSubmit, setValues, isSubmitting, touched, values, status }) => {
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
                    <DropDown field={{name: "addressRegion1"}} form={{}} valueList={[
                        {value: t('KOWLOON'), name: t('KOWLOON')},
                        {value: t('HONG KONG ISLAND'), name: t('HONG KONG ISLAND')},
                        {value: t('NEW TERRITORIES'), name: t('NEW TERRITORIES')},
                        {value: t('LANTAU'), name: t('LANTAU')},
                    ]} onChange={(e)=>this.changeAcct(e)}/>
                    <Field
                        name="telephone"
                        type="text"
                        component={TextField}
                        label={t('Phone')}
                        value={values.telephone}
                        err={errors.telephone}
                    />
                    <RadioButtonGroup
                        name="verifyBySMS"
                        label={t('How do you want to verify your account?')}
                        value={values.verifyBySMS}
                        err={errors.verifyBySMS}
                        touched={touched}
                    >
                        <Field
                            component={RadioButton}
                            name="verifyBySMS"
                            value="SMS"
                            label="SMS"
                            checked={values.verifyBySMS==="SMS"}
                        />
                        <Field
                            component={RadioButton}
                            name="verifyBySMS"
                            value="Email"
                            label="Email"
                            checked={values.verifyBySMS==="Email"}
                        />
                    </RadioButtonGroup>
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