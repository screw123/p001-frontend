import styled from 'styled-components'

import { CardNumberElement, CardExpiryElement, CardCVCElement } from 'react-stripe-elements'

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 0;
	margin: 1rem 0;
	border-bottom: 2px solid #e8e8e8;
`

export const Title = styled.div`
	color: #787f84;
	font-size: 1.75rem;
	font-weight: 600;
	line-height: 2rem;
`

export const CrossIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 2rem;
	width: 2rem;
	font-size: 1.5rem;
	color: #e61d6e;
	border: 2px solid #e61d6e;
	border-radius: 50%;
	cursor: pointer;
`
export const FieldContainer = styled.div`
	display: flex;
	flex-flow: column wrap;
`

export const Container = styled.div`
	display: block;
	box-sizing: border-box;
	padding: 1rem 0;
	min-width: 220px;
`
export const SubmitWrapper = styled.div`
	align-self: center;
`

export const Wrapper = styled.div`
	display: flex;
	box-sizing: border-box;
	border-radius: 2em;
	background: #f4f4f4;
	border: 0.1em solid #999999;
	text-overflow: clip;
	padding: 0.8rem;
	font-size: 1rem;
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
