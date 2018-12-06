import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const CreditCardInfo = (props) => {
	let source = props.source
	console.log('CreditCardInfo called', props, source)
	let cardIcon
	switch(source.card.brand) {
		case 'Visa':
			cardIcon = 'faCcVisa'
			break
		case 'MasterCard':
			cardIcon = 'faCcMastercard'
			break
		case 'American Express':
			cardIcon = 'faCcAmex'
			break
		default:
			cardIcon = 'faCreditCard'
	}
	return(
		<CardDiv>
			<FontAwesomeIcon icon={cardIcon} />
			<span>{'XXXX XXXX XXXX ' + source.card.last4}</span>
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