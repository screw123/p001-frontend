import React from 'react'
import styled from 'styled-components'

import { CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements'

export const StripeCardNumberInput = styled(CardNumberElement)`
	width: 100%;
	display: block;
	border: none;
	background: transparent;
	font-size: 5em;
	outline: none;
`

export const StripeCardExpiryInput = styled(CardExpiryElement)`
	width: 100%;
	display: block;
	border: none;
	background: transparent;
	font-size: 5em;
	outline: none;
`

export const StripeCardCVCInput = styled(CardCVCElement)`
	width: 100%;
	display: block;
	border: none;
	background: transparent;
	font-size: 5em;
	outline: none;
`

export default {}


