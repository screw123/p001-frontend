import React from "react"

import { Redirect } from "react-router-dom"
import { ApolloProvider, Query, Mutation } from "react-apollo"

import { Formik, Field } from 'formik'
import FormikForm, { FormButton, FormErr } from '../component/FormikForm.js'

import { getAccountById, getQuotationAndAccountById, addRentalOrder } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import {BigLoadingScreen} from '../component/Loading.js'

import { QuotationDisplay } from '../component/QuotationDisplay.js'

import SelectAddress from '../component/SelectAddress.js'
import SelectCreditCard from '../component/SelectCreditCard.js'

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
		this.togglePaymentInfo = this.togglePaymentInfo.bind(this)
		

		this.state = {
			submitting: false,
			showPaymentInfoComponent: false,
			showPaymentInfo: false,
			redirectToQuotation: false,
		}
	}

	backToQuotationForm = () => { this.setState({redirectToQuotation: true}) }

	togglePaymentInfoComponent = () => this.setState(prevState=>({showPaymentInfoComponent: (prevState.showPaymentInfoComponent? false: true) }))

	togglePaymentInfo = () => this.setState(prevState=>({showPaymentInfo: (prevState.showPaymentInfo? false: true) }))

	addSalesOrderClient = async (mutate, quotation_id) => {
		const d = await mutate({variables: {
            quotation_id: this.props.quotation_id
        }})
        console.log('server return', d)
	}

    render(){
		if (this.state.redirectToQuotation) { return (<Redirect to={{pathname: '/quotation'}} />) }

		const g = this.props.login
		const c = this.props.i18n

		let quotation = get(this.props, 'location.state.quotation', undefined) || this.props.quotation || undefined
		let quotation_id= this.props.quotation_id || this.props.match.params.quotation_id || undefined
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
				<Query query={query_gql} variables={query_var} notifyOnNetworkStatusChange>
				{({ loading: queryLoading, error: queryErr, data, refetch, networkStatus }) => {

					if (queryLoading) return (<BigLoadingScreen text={'Loading...'}/>)
					if (queryErr) {
						console.log('SalesOrderConfirmForm', queryErr)
						const errStack = parseApolloErr(queryErr, c.t)

						return (
							<div>
								{errStack.map(v=>{ return <p>{v.message}</p> }) }
							</div>	
						)
					}

					const q = quotation||data.getQuotationById
					const a = data.getAccountById

					let stripeCusObj = null
					if (a.stripeCustomerObject) { stripeCusObj = JSON.parse(a.stripeCustomerObject) }

					return (<div>

						<QuotationDisplay quotation={q} account={a} />
						{!this.state.showPaymentInfo && <p>Is everything ok?</p>}
						{!this.state.showPaymentInfo && <FormButton onClick={()=>this.togglePaymentInfo()}>
							{c.t('Yes, all fine!')}
						</FormButton>}
						{!this.state.showPaymentInfo && <FormButton onClick={()=>this.backToQuotationForm()}>
							{c.t('I want to make changes')}
						</FormButton>}

						{this.state.showPaymentInfo && 
						<Mutation mutation={addRentalOrder} errorPolicy="all">
						{(mutate, {loading: mutateLoading, err: mutateErr})=>{ return(
							<Formik
								initialValues={{
									billingAddress: get(a, 'defaultBillingAddress_id._id', undefined),
									quotation_id: q._id,
									account_id: a._id,
									cardId: get(stripeCusObj, 'default_source', undefined) 
								}}
								validate={(v)=> {
									if ((v.billingAddress==='') || (v.billingAddress===undefined)) {
										return {billingAddress : 'Please provide a billing address'}
									}
									if ((v.cardId==='') || (v.cardId===undefined)) {
										return {cardId : 'Please choose a credit card'}
									}
									else return {}
								}}
								onSubmit={async (values, actions) => {
									actions.setStatus('')
									try {
                                        const d = await mutate({variables: {
                                            billingAddress_id: values.billingAddress,
                                            quotation_id: values.quotation_id,
											account_id: values.account_id,
											cardId: values.cardId
                                        }})
                                        console.log('server return', d)
                                        if (this.props.onConfirmSuccess) { this.props.onConfirmSuccess(d.data.addRentalOrderFromQuotation)}
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
										console.log(e, errStack)
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
											onAddressUpdate={()=>refetch()}
											multiSelect={false}
											isLoading={networkStatus===4}
											err={errors['billingAddress']}
										/>
										<Field
											name="cardId"
											type="text"
											component={SelectCreditCard}
											label={c.t('Credit card for payment')}
											placeholder={c.t('Please choose your credit card')}
											account={a}
											onChange={(v)=>setFieldValue('card_id', v.cardId)}
											allowAddCard={true}
											onAddCard={()=>refetch()}
											multiSelect={false}
											isLoading={networkStatus===4}
											err={errors['cardId']}
										/>
										<FormButton onClick={()=>this.addSalesOrderClient(mutate, this.props.quotation_id)}>
											{c.t('Submit')}
										</FormButton>
										<FormErr>{status}</FormErr>
									</FormikForm>
									
								</div>
							)}
							</Formik>
						) }}
						</Mutation>}
						
					</div>)
				}}
				</Query>}
				
				
            </ApolloProvider>
    )}
                
}

export default SalesOrderConfirmForm

/*
										<SelectCreditCard
											allowAddCard={true}
											disabled={false}
											account_id={a._id}
											defaultSelected={values.card_id}
											{...this.props}
										/>
										*/