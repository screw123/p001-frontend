import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ApolloProvider, Query, Mutation } from "react-apollo"

import parseApolloErr from '../util/parseErr.js'
import {LoadingIcon} from './Loading.js'
import AddCreditCardForm from '../form/AddCreditCardForm.js'

import { getStripeCusObj } from '../gql/query.js'

/*
props:
allowAddCard: boolean
account + refetch or account_id
disabled
g
c
*/

class SelectCreditCard extends React.Component {
	constructor(props) {
		super(props)
		this.state={showAddNewCard: false}
		this.toggleAddNewCard=this.toggleAddNewCard.bind(this)
	}

	toggleAddNewCard=()=> this.setState(prevState=>({showAddNewCard: (prevState.showAddNewCard? false: true) }))

	render() {
		const g = this.props.login
		const c = this.props.i18n

		if (this.props.account_id) {
			return(
				<ApolloProvider client={g.getGqlClient()}>
					<Query query={getStripeCusObj} variables={{account_id: this.props.account_id}} notifyOnNetworkStatusChange>
					{({ loading, error, data, refetch, networkStatus }) => {
						if (loading) return (<LoadingIcon size={3}/>)
						if (error) {
							const errStack = parseApolloErr(error)
							return (<div>
								{errStack.forEach(v=>{ return(<p>{v.message}</p>) }) }
							</div>)
						}
						return(<div>
							{!this.state.showAddNewCard && <CreditCardList
								stripeCustomerObject={data.getAccountById.stripeCustomerObject}
								toggleAddNewCard={this.toggleAddNewCard}
								{...this.props}
							/>}
							{!!this.state.showAddNewCard && <AddCreditCardForm
								onSuccess={()=>{
									refetch()
									this.toggleAddNewCard()
								}}
								{...this.props}
							/>}
						</div>)

						
					}}
					</Query>
				</ApolloProvider>
			)
		}
		else if (this.props.account) {
			return(<div>
				{!this.state.showAddNewCard && <CreditCardList
					stripeCustomerObject={this.props.account.stripeCustomerObject}
					toggleAddNewCard={this.toggleAddNewCard}
					{...this.props}
				/>}
				{!!this.state.showAddNewCard && <AddCreditCardForm
					account_id={this.props.account._id}
					onSuccess={()=>{
						this.props.refetch()
						this.toggleAddNewCard()
					}}
					{...this.props}
				/>}
			</div>)
		}

	}
}

const CreditCardList = (props) =>{
	const c = props.i18n
	return(
		<div>
			<p>Please choose a credit card:</p>
			{props.allowAddCard && <AddCardButton onClick={props.toggleAddNewCard} disabled={props.disabled}>
				<FontAwesomeIcon icon='plus-circle'/>
				{c.t('Add New Card')}
			</AddCardButton>}
			{getCards(props.stripeCustomerObject, c.t)}
		</div>
	)
}

const getCards = (stripeCusObj, t)=> {
		
	if (!stripeCusObj) { return (<span>{t('You have no credit card registered with us.')}</span>) }

	let returnHTML = []
	const s = JSON.parse(stripeCusObj)
	
	if (s.sources.data.length===0) {
		returnHTML.push(<span>{t('You have no credit card registered with us.')}</span>)
	}
	for(let i=0;i<s.sources.data.length;i++) {
		returnHTML.push(genCreditCardInfo(s.sources.data[i]))
	}
	
	return returnHTML
}


export const genCreditCardInfo = (source) => {
	let cardIcon

	switch(source.card.brand) {
		case 'Visa':
			cardIcon = ['fab', 'cc-visa']
			break
		case 'MasterCard':
			cardIcon = ['fab', 'cc-mastercard']
			break
		case 'American Express':
			cardIcon = ['fab', 'cc-amex']
			break
		default:
			cardIcon = 'credit-card'
	}

	return(
		<CardDiv>
			<span></span>
			<FontAwesomeIcon icon={cardIcon} size='2x' />
			<span>{'XXXX XXXX XXXX ' + source.card.last4}</span><br />
			<span>{source.card.exp_month + ' / ' + source.card.exp_year}</span>
		</CardDiv>
	)
}

export const CardDiv = styled.div`
    display: block
    box-sizing:border-box;
    padding: 1em;
    min-width: 220px;
`

const AddCardButton = styled.button`

`

export default SelectCreditCard