import React from 'react'
import styled from 'styled-components'

import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements'

export const Container = styled.div`
	display: block;
	box-sizing: border-box;
	padding: 1em;
	min-width: 220px;
`
export const Label = styled.div`
	display: block;
	text-transform: uppercase;
	font-size: 0.9em;
`

export const Wrapper = styled.div`
	display: flex;
	box-sizing: border-box;
	border-radius: 0.25em;
	border: 0.1em solid #999999;
	background-color: rgba(255,255,255,0.1);
	text-overflow: clip;
	padding: 0.5em;
	font-size: 1.1em;
`

export const StripeCardNumberInput = styled(CardNumberElement)`
	width: 100%;
	display: block;
	border: none;
	background: transparent;
	font-size: 1em;
	outline: none;
`

export const StripeCardExpiryInput = styled(CardExpiryElement)`
	width: 100%;
	display: block;
	border: none;
	background: transparent;
	font-size: 1em;
	outline: none;
`

export const StripeCardCVCInput = styled(CardCVCElement)`
	width: 100%;
	display: block;
	border: none;
	background: transparent;
	font-size: 1em;
	outline: none;
`

export default {}


