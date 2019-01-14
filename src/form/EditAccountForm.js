import React from 'react'
import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FormTag} from '../component/FormikForm.js'
import get from 'lodash/get'
import styled from "styled-components"

import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

import { ApolloProvider, Mutation } from 'react-apollo'
import { updateAccount } from '../gql/query.js'

import parseApolloErr from '../util/parseErr.js'

import SelectAddress from "../component/SelectAddress"
import SelectCreditCard from "../component/SelectCreditCard"

class EditAccountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showEditAddress: false }
	}

	handleEditAddress = () => {
		this.setState({ showEditAddress: !this.state.showEditAddress })
	}

    validate(v) {
        const validateFunc = {
            name: ({name}) => (name.length>0)? undefined : 'Please provide a name for this account',
            name: ({name}) => (name.length<255)? undefined : 'Name cannot be longer than 255 characters',
            selectedAddress: () => undefined,
            lastUpdate: () => undefined,
            cardId: () => undefined
        }
        const keyArr = Object.keys(v)
        let err = {}
        for (let i=0; i<keyArr.length; i++) {
            const f = keyArr[i]
            console.log(f)
            const e = validateFunc[keyArr[i]](v)
            err[f] = e
        }
        return omitBy(err, isUndefined)
    }

	render() {
        const g = this.props.login
        const c = this.props.i18n
        const account = this.props.account
        const readonly = this.props.mode==='view'

        let role = 'viewer'
        if (g.state.myself.accountOwn_id.find(v=>v._id===account._id)) { role='owner'}
        if (g.state.myself.accountManage_id.find(v=>v._id===account._id)) { role='manager'}

        console.log('role=', role)

		return (
            <ApolloProvider client={g.getGqlClient()}>
                <Mutation mutation={updateAccount} errorPolicy="all">
                {(mutate, {loading, err})=>(
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: account.name,
                            selectedAddress: get(account, 'address_id[0]._id', undefined),
                            lastUpdate: c.moment(account.updateDateTime).calendar()
                        }}

                        validate={this.validate}
                        onSubmit={async(values, actions) => {
                            actions.setStatus('')
                            
                            //submit to server
                            console.log('validate ok, now submit')
                            try {
                                const vars = {
                                    name: values.name,
                                    account_id: account._id
                                }

                                console.log('vars=', vars)
                                const d = await mutate({variables: vars})
                                console.log('server return', d)
                                
                            } catch(e) { 
                                console.log('submit err', e)
                                const errStack = parseApolloErr(e, c.t)
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
                    {({ values, status, setFieldValue, errors, dirty, isSubmitting }) => (
                        <FormikForm>
                            <Field
                                name="name"
                                type="text"
                                component={TextField}
                                label={'Name'}
                                err={errors.name}
                                value={values.name}
                                placeholder="Name"
                                disabled={readonly && (role==='owner')}
                                ignoreTouch={true}
                            />
                            <Field
                                name="accoutType"
                                type="text"
                                component={FormTag}
                                label={'Account Type'}
                                background={(account.accountType==='PERSONAL')? 'LightGreen': 'RoyalBlue'}
                                value={account.accountType}
                            />
                            <Field
                                name="selectedAddress"
                                type="text"
                                disabled={readonly && (role!=='viewer')}
                                component={SelectAddress}
                                label={'Addresses'}
                                value={values.selectedAddress}
                                placeholder={c.t('You have no addresses with us')}
                                account_id= {account._id}
                                addresses={account.address_id}
                                defaultShippingAddress_id={get(account, 'defaultShippingAddress_id._id',null)}
                                defaultBillingAddress_id={get(account, 'defaultBillingAddress_id._id',null)}
                                onChange={(v)=>setFieldValue('selectedAddress', v._id)}
                                allowAddAddress={true}
                                allowEditAddress={true}
                                onAddressUpdate={this.props.onInfoUpdate}
                                multiSelect={false}
                                err={errors['selectedAddress']}
                            />
                            {(role==='owner') && <Field
                                name="cardId"
                                type="text"
                                component={SelectCreditCard}
                                label={c.t('Credit Card')}
                                placeholder={c.t('Select a credit card to update/remove')}
                                account={this.props.account}
                                onChange={(v)=>setFieldValue('card_id', v.cardId)}
                                allowAddCard={true}
                                allowRemoveCard={true}
                                onInfoUpdate={this.props.onInfoUpdate}
                                multiSelect={false}
                                isLoading={this.props.gqlNetworkStatus===4}
                                err={errors['cardId']}
                                disabled={readonly}
                            />}
                            <Field
                                name="lastUpdate"
                                type="text"
                                component={TextField}
                                label={'Last Update'}
                                value={values.lastUpdate}
                                disabled
                            />
                            <FormButton
                                type="submit"
                                disabled={!dirty || isSubmitting || readonly}
                            >
                                Submit
                            </FormButton>
                            <FormErr>{status && status.form}</FormErr>

                        </FormikForm>
                    )}
                    </Formik>
                )}
                </Mutation>
            </ApolloProvider>
        )
	}
}

export default EditAccountForm