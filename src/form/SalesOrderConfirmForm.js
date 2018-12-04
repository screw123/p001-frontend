import React from "react"

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import { Formik, Field } from 'formik'
import FormikForm, { FormButton, FormErr } from '../component/FormikForm.js'

import GqlApi from '../stateContainer/GqlApi.js'
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import { ApolloProvider, Query, Mutation } from "react-apollo"

import { getQuotationById, getAccountById, getQuotationAndAccountById, addRentalOrder } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import {BigLoadingScreen} from '../component/Loading.js'

import { QuotationDisplay } from '../component/QuotationDisplay.js'

import SelectAddress from '../component/SelectAddress.js'
import PaymentInfoForm from './PaymentInfoForm.js'

import get from 'lodash/get'
/*
Props:
Quotation object: this.props.location.state.quotation || this.props.quotation
Account object: this.props.location.state.account || this.props.account
Quotation_id: this.props.quotation_id
account_id: this.props.account_id

*/


class SalesOrderConfirmForm extends React.Component {
	
	constructor(props) {
		super(props) //Fixme props should pass whole account object instead of just account_id
		this.addSalesOrderClient = this.addSalesOrderClient.bind(this)
		this.backToQuotationForm = this.backToQuotationForm.bind(this)
		this.togglePaymentInfoComponent = this.togglePaymentInfoComponent.bind(this)

		console.log('loaded SalesOrderConfirmForm')

		this.state = {
			submitting: false,
			showPaymentInfoComponent: false
		}
	}

	backToQuotationForm = () => {
		console.log('backToQuotationForm')
	}
	
	togglePaymentInfoComponent = () => this.setState(prevState=>({showPaymentInfoComponent: (prevState.showPaymentInfoComponent? false: true) }))

	addSalesOrderClient = async (mutate, quotation_id) => {
		const d = await mutate({variables: {
            quotation_id: this.props.quotation_id
        }})
        console.log('server return', d)
	}

    render(){
		const g = this.props.login
		const c = this.props.i18n

		let quotation = get(this.props, 'location.state.quotation', undefined) || this.props.quotation || undefined
		let quotation_id= this.props.quotation_id || this.props.match.params.quotation_id || undefined
		console.log(quotation, quotation_id)
		if ((quotation===undefined) && (quotation_id===undefined)) {
			return (<p>{'Error: Quotation is not available'}</p>)
		}
		
		let account_id = get(this.props, 'location.state.quotation.account_id._id', undefined) || get(this.props, 'location.state.account_id', undefined) || this.props.account_id || undefined
		if (account_id===undefined) { 
			//fixme should show an account selector instead of assuming to use first account
			const acctList = g.getManagedAccounts()
			if (acctList.length>0) { account_id = acctList[0]._id }
			else { return (<p>{'Error: Account is not available'}</p>) }
		}

		let query_gql
		let query_var = {}

		if (quotation) {
			query_gql = getAccountById
			query_var= {account_id: account_id}
		}
		else {
			query_gql = getQuotationAndAccountById
			query_var = {quotation_id: quotation_id, account_id: account_id}
		}

		return (
            <ApolloProvider client={g.getGqlClient()}>
				{this.state.showPaymentInfoComponent && <PaymentInfoForm />}
				<Query query={query_gql} variables={query_var} notifyOnNetworkStatusChange>
				{({ loading: queryLoading, error: queryErr, data, refetch, networkStatus }) => {

					if (queryLoading) return (<BigLoadingScreen text={'Loading...'}/>)
					if (queryErr) {
						console.log('SalesOrderConfirmForm', queryErr)
						const errStack = parseApolloErr(queryErr)
						return (
							<div>
								{errStack.forEach(v=>{ return(<p>{v.message}</p>) }) }
							</div>	
						)
					}

					const q = quotation||data.getQuotationById
					const a = data.getAccountById
					console.log('data.getAccountById, ', a)

					return (<div>
						<Mutation mutation={addRentalOrder} errorPolicy="all">
						{(mutate, {loading: mutateLoading, err: mutateErr})=>{ return(
							<Formik
								initialValues={{
									billingAddress: get(a, 'defaultBillingAddress_id._id', undefined) || '',
									quotation_id: q._id,
									account_id: a._id
								}}
								validate={(v)=> {
									if ((v.billingAddress==='') || (v.billingAddress===undefined)) {
										return {billingAddress : 'Please provide a billing address'}
									}
									else return {}
								}}
								onSubmit={async (values, actions) => {
									actions.setStatus('')
									try {
                                        const d = await mutate({variables: {
                                            billingAddress_id: values.billingAddress,
                                            quotation_id: values.quotation_id,
                                            account_id: values.account_id
                                        }})
                                        console.log('server return', d)
                                        if (this.props.onConfirmSuccess) { this.props.onConfirmSuccess(d.data.addRentalOrder)}
                                    }
                                    catch(e) {
										const errStack = parseApolloErr(e, c.t)
										for (let i=0; i<errStack.length; i++) {
											if (errStack[i].type==='NO_PAYMENT_INFO') {
												console.log('togglePaymentInfoComponent')
												this.togglePaymentInfoComponent()
												continue
											}
											if (errStack[i].key) { 
												console.log('err key =', errStack[i].key)
												
												actions.setFieldError(errStack[i].key, errStack[i].message)
											}
											else {
												actions.setStatus(errStack[i].message)
											}
										}
										console.log(errStack)
									}



									actions.setSubmitting(false)
								}}
							>
							{({ errors, isSubmitting, dirty, touched, values, status, setFieldValue }) => (
								<div>
									<FormikForm>
										
										<Field
											name="billingAddress"
											type="text"
											component={SelectAddress}
											label={c.t('Billing Address')}
											placeholder={c.t('Please choose your billing address')}
											account_id= {a._id}
											addresses={a.address_id}
											onChange={(v)=>setFieldValue('billingAddress', v._id)}
											allowAddAddress={true}
											onAddNewAddress={(v)=>refetch()}
											multiSelect={false}
											isLoading={networkStatus===4}
											err={errors['billingAddress']}
										/>
										<QuotationDisplay quotation={q} account={a} />
										<p>Is everything ok?</p>
										<FormButton onClick={()=>this.addSalesOrderClient(mutate, this.props.quotation_id)}>
											{c.t('Submit')}
										</FormButton>
										<FormErr>{status}</FormErr>
									</FormikForm>
									
								</div>
							)}
							</Formik>
						) }}
						</Mutation>
						
					</div>)
				}}
				</Query>}
				
				
            </ApolloProvider>
    )}
                
}

export default SalesOrderConfirmForm