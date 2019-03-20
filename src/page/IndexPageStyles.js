import styled from 'styled-components'

export const TopSection = styled.div`
	position: relative;
	display: flex;
	flex-flow: column wrap;
	align-items: flex-start;
	height: 80vh;
	min-height: 50rem;
	padding: 3rem 55% 0 6rem;
	background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
	@media (max-width: 1200px) {
		padding-right: 45%;
	}
	@media (max-width: 1024px) {
		padding-left: 2rem;
		min-height: 45rem;
	}
	@media (max-width: 900px) {
		padding-right: 25%;
	}
	@media (max-width: 768px) {
		min-height: 35rem;
		padding-left: 1rem;
	}
`
export const Image = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background: url('wisekeep.svg') no-repeat;
	background-size: auto;
	background-position: right bottom;
	@media (max-width: 1200px) {
		background-size: 75% auto;
	}
	@media (max-width: 900px) {
		background-size: 70% auto;
		background-position: center bottom;
	}
	@media (max-width: 500px) {
		background-size: 85% auto;
	}
`

export const Section = styled.div`
	padding: 5rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (max-width: 1024px) {
		padding: 2rem 0;
	}
	@media (max-width: 768px) {
		padding: 1rem 0;
	}
`

export const CardsRow = styled.div`
	margin: 3rem 0;
	width: 100%;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	@media (max-width: 1024px) {
		margin: 1rem 0;
	}
`

export const Card = styled.div`
	margin: 0 1%;
	width: 23%;
	height: 22rem;
	display: flex;
	flex-direction: column;
	transition: all 0.2s ease-in-out;
	background: #f8f9fa;
	border-radius: 0.5rem;
	&:hover {
		transform: scale(1.1);
		box-shadow: 0.4rem 0.8rem 0.8rem 0 rgba(230, 29, 110, 0.25);
		overflow: hidden;
	}
	@media (max-width: 1024px) {
		width: 46%;
		margin: 1rem 2%;
		max-width: 18rem;
	}
	@media (max-width: 400px) {
		height: 18rem;
		width: 80%;
		margin: 1rem 10%;
	}
`

export const CardImage = styled.div`
	flex: 0 0 60%;
	background: ${props => `url(${props.image}) no-repeat`};
	background-size: 100% 100%;
	@media (min-width: 1025px) and (max-width: 1200px) {
		flex: 0 0 50%;
	}
`

export const CardContent = styled.div`
	flex: 0 0 25%;
	max-height: 25%;
	padding: 0.5rem 1rem;
	@media (min-width: 1025px) and (max-width: 1200px) {
		flex: 0 0 35%;
		max-height: 35%;
	}
`

export const CardFooter = styled.div`
	flex: 0 0 15%;
	padding: 0.4rem;
	background-color: rgba(0, 0, 0, 0.03);
	visibility: hidden;
	${Card}:hover & {
		visibility: visible;
	}
`
