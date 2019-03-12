import styled from 'styled-components'

import {AccentedCard} from  './BasicComponents.js'

export const BigCard = styled(AccentedCard)`
	display: flex;
	min-height: 70vh;
`

export const TwinCard = styled(AccentedCard)`
	display: grid;
	min-height: 70vh;
	grid-template-columns: 1fr 1fr;
	@media (max-width: 768px) {
		grid-template-columns: auto;
	}
`


export const LeftSide = styled.div`
	padding: 2rem;
	color: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const RightSide = styled.div`
	padding: 2rem;
	border-radius: 1rem;
	background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: 768px) {
		display: none;
	}
`

