import React from "react"

import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import GqlApi from '../stateContainer/GqlApi.js'
import LocaleApi, {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import { ApolloProvider, Query, Mutation } from "react-apollo"

import { getQuotationById, addRentalOrder } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import {BigLoadingScreen} from '../component/Loading.js'

import { QuotationDisplay } from '../component/QuotationDisplay.js'
import { FormButton } from '../component/FormikForm.js'

import SelectAddress from '../component/SelectAddress.js'

class SalesOrderConfirmForm extends React.Component {
	
	constructor(props) {
		super(props) //Fixme props should pass whole account object instead of just account_id
		this.addSalesOrderClient = this.addSalesOrderClient.bind(this)
		this.backToQuotationForm = this.backToQuotationForm.bind(this)
		this.handleBillingAddressChange = this.handleBillingAddressChange.bind(this)
		this.state = {
			submitting: false,
			selectedBillingAddress: undefined
		}
	}
	
	
	
	backToQuotationForm = () => {
		console.log('backToQuotationForm')
	}
	
	addSalesOrderClient = async (mutate, quotation_id) => {
		const d = await mutate({variables: {
            quotation_id: this.props.quotation_id
        }})
        console.log('server return', d)
	}
	
	handleBillingAddressChange(id) {
		this.setState({selectedBillingAddress: id})
	}
	
    //props= quotation_id
    render(){ return (
        <LocaleApiSubscriber>
        {(c)=>(
            <ApolloProvider client={GqlApi.getGqlClient()}>
                <Query query={getQuotationById} variables={{quotation_id: this.props.quotation_id, account_id: this.props.account_id}}>
                {({ client, loading: queryLoading, error: queryErr, data, refetch }) => (
                    <Mutation mutation={addRentalOrder} errorPolicy="all">
                    {(mutate, {loading: mutateLoading, err: mutateErr})=>{
                    
                        if (queryLoading) return (<BigLoadingScreen text={'Getting your best price'}/>)
                        
                        if (queryErr) {
                            console.log('SalesOrderConfirmForm', queryErr, this.props.quotation_id)
                            return (<p>{parseApolloErr(queryErr, c.t)}(</p>)
                        }
                    	console.log('data=', data)
                    	const quote = data.getQuotationById
                    	
                        return(
							<div>
								<h3>{c.t('Billing Address')}</h3>
								<SelectAddress
									addressLine={data.getAccountById.address_id}
									selected={this.state.selectedBillingAddress||data.getAccountById.defaultBillingAddress_id._id}
									onChange={this.handleBillingAddressChange}
								/>
								<QuotationDisplay quotation={quote} />
								<p>Is everything ok?</p>
								<FormButton onClick={()=>this.addSalesOrderClient(mutate, this.props.quotation_id)}>
									{c.t('Submit')}
								</FormButton>
							</div>
                            
                        )
                    }}
                    </Mutation>
                )}
                </Query>
            </ApolloProvider>
        )}
        </LocaleApiSubscriber>
    )}
                
}


export default SalesOrderConfirmForm