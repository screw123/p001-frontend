import React from "react"

import { I18n } from 'react-i18next'

import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

import GqlApi from '../container/GqlApi.js'
import LocaleApi, {LocaleApiSubscriber} from '../container/LocaleApi.js'
import { ApolloProvider, Query, Mutation } from "react-apollo"

import { getQuotationById, addRentalOrder } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import {BigLoadingScreen} from '../component/Loading.js'

import { Blockdiv } from '../component/Doc.js'
import { FormButton } from '../component/FormikForm.js'

class SalesOrderConfirmForm extends React.Component {
	
	constructor(props) {
		super(props)
		this.genQuotationLines = this.genQuotationLines.bind(this)
		this.addSalesOrderClient = this.addSalesOrderClient.bind(this)
		this.backToQuotationForm = this.backToQuotationForm.bind(this)
		this.state = {
			submitting: false
		}
	}
	
	genQuotationLines = (qd, t) => {
		let coms = []
		for (let i=0; i< qd.length; i++) {
			const line = qd[i]
			coms.push(
				<div key={'line'+i}>
					<img src={line.SKU_id.iconPicURL} width={50} height={50} />
					<div>
						<Blockdiv><label>{t(line.SKU_id.name)}</label></Blockdiv>
						<Blockdiv><label>{t('Dimension') + ' : ' + (line.SKU_id.lengthM * 100) + 'cm x ' + (line.SKU_id.widthM * 100) + 'cm x ' + (line.SKU_id.heightM * 100) + 'cm'}</label></Blockdiv>
						<Blockdiv><label>{line.duration + ' ' + t(line.rentMode)}</label></Blockdiv>
						<label>{'Qty : ' + line.qty}</label>
						<label>{'Unit Price : ' + line.rent_unitPrice}</label>
						<label>{'Unit Discount : ' + line.rent_unitDiscount}</label>
						<label>{'Line Total : ' + line.rent_discountedLineTotal}</label>
						<p>{'Remarks: ' + line.remarks}</p>
					</div>
				</div>
			)
			
		}
		return coms
	}
	
	backToQuotationForm = () => {
		console.log('backToQuotationForm')
		
	}
	
	addSalesOrderClient = async (mutate, quotation_id) => {
		console.log('addSalesOrderClient')
		const d = await mutate({variables: {
            quotation_id: this.props.quotation_id
        }})
        console.log('server return', d)
	}
	
    //props= quotation_id
    render(){ return (
        <LocaleApiSubscriber>
        {(c)=>(
            <ApolloProvider client={GqlApi.getGqlClient()}>
                <Query query={getQuotationById} variables={{quotation_id: this.props.quotation_id}}>
                {({ client, loading: queryLoading, error: queryErr, data, refetch }) => (
                    <Mutation mutation={addRentalOrder} errorPolicy="all">
                    {(mutate, {loading: mutateLoading, err: mutateErr})=>{
                    
                        if (queryLoading) return (<BigLoadingScreen text={'Getting your best price'}/>)
                        
                        if (queryErr) {
                            console.log('SalesOrderConfirmForm', queryErr, this.props.quotation_id)
                            return (<p>{parseApolloErr(queryErr, c.t)}(</p>)
                        }
                    	
                    	const quote = data.getQuotationById
                    	
                        return(
							<div>
								<p>{c.t('Account')+' : ' + quote.account_id.name + ' (' + quote.account_id._id + ')'}</p>
								<p>{c.t('Quotation date') + ' : ' + c.moment(quote.createDateTime).format('YYYY-MM-DD HH:mm')}</p>
								{this.genQuotationLines(quote.quotationDetails, c.t)}
								<h3>{'Total Price : ' + quote.discountedPrice}</h3>
								<p>Is everything ok?</p>
								<FormButton onClick={()=>this.addSalesOrderClient(mutate, this.props.quotation_id)}>
									Yes
								</FormButton>
								<FormButton onClick={()=>this.backToQuotationForm()}>
									No
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