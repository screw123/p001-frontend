import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faStar } from '@fortawesome/free-solid-svg-icons'

export const TopSection = styled.div`
	position: relative;
	display: flex;
	flex-flow: column wrap;
	align-items: flex-start;
	height: 60vh;
	min-height: 27rem;
	padding: 3rem 45% 0 6rem;
	background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
	@media (max-width: 1024px) {
		padding: 0 45% 0 2rem;
		min-height: 20rem;
	}
	@media (max-width: 768px) {
		padding: 0 45% 0 1rem;
		height: 40vh;
	}
`

const BannerImage = styled.div`
	width: 100%;
	height: 100%;
	background: url('wisekeep.svg') no-repeat;
	background-size: contain;
	background-position: right bottom;
`

const BannerWrapper = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	width: 85%;
	height: 100%;
`

export const Banner = () => (
	<BannerWrapper>
		<BannerImage />
	</BannerWrapper>
)

export const Section = styled.div`
	padding: ${props => (props.top ? '3rem  0' : '0 0 3rem')};
	display: flex;
	flex-direction: column;
	align-items: center;
	background: #f3f3f3;
	@media (max-width: 1024px) {
		padding: ${props => (props.top ? '2rem  0' : '0 0 2rem')};
	}
	@media (max-width: 768px) {
		padding: ${props => (props.top ? '1rem  0' : '0 0 1rem')};
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
	background: #fff;
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
	background: ${props => `url(${props.image}) no-repeat center`};
	background-size: 50% 50%;
	background-color: #f44d80;
	border-bottom-left-radius: 50% 10%;
	border-bottom-right-radius: 50% 10%;
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
	display: flex;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.03);
	visibility: hidden;
	${Card}:hover & {
		visibility: visible;
	}
`
export const RightIconWrapper = styled.div`
	color: #787f84;
	cursor: pointer;
	font-size: 1rem;
	padding: 0.2rem 0.4rem;
`
export const RightIcon = styled(({ ...props }) => <FontAwesomeIcon icon={faArrowRight} />)``

//CardTwo
export const CardsTwoRow = styled.div`
	margin: 2rem 0;
	width: 100%;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	@media (max-width: 1100px) {
		margin: 1rem 0;
		flex-direction: column;
	}
`

export const CardTwo = styled.div`
	display: flex;
	margin: 1rem 0;
	flex: 1;
	@media (max-width: 1100px) {
		background-color: white;
		border-radius: 1rem;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
	}
`

export const CardTwoImage = styled.div`
	align-self: center;
	min-width: 8rem;
	min-height: 8rem;
	width: 8rem;
	height: 8rem;
	background: ${props => `url(${props.image}) no-repeat center`};
	background-size: 80% 80%;
	@media (min-width: 1101px) {
		background-color: white;
		border-radius: 1rem;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
	}
`

export const CardTwoContent = styled.div`
	margin: auto;
	padding: 0rem 1rem;
`

export const TextBig = styled.div`
	color: #e61d6e;
	font-size: 1.75rem;
	font-weight: 500;
`

//Plan Section

export const PlanSection = styled.div`
	display: flex;
`

export const PlanImage = styled.div`
	flex-basis: 30%;
	min-height: 50rem;
	background: url('img-wisekeep-box.png');
	background-size: cover;
	@media (max-width: 1250px) {
		flex-basis: 25%;
	}
	@media (max-width: 1160px) {
		flex-basis: 20%;
	}
	@media (max-width: 1085px) {
		flex-basis: 15%;
	}
	@media (max-width: 950px) {
		flex-basis: 0%;
		min-height: 0;
	}
`
export const ProgressImage = styled.div`
	margin: 1rem 0;
	align-self: center;
	width: 100%;
	height: 2.15rem;
	background: ${props => `url(${props.image}) no-repeat center`};
	background-size: 100% 100%;
`
export const PlanContent = styled.div`
	flex-grow: 1;
	padding: 3rem 6rem;
	margin: auto;
	@media (max-width: 1024px) {
		padding: 2rem;
	}
	@media (max-width: 768px) {
		padding: 1.75rem 1rem;
	}
`

export const PlanFooter = styled.div`
	display: flex;
	flex-flow: column wrap;
`
export const NextButton = styled.div`
	align-self: flex-end;
	padding: 1rem 0;
	@media (max-width: 950px) {
		align-self: center;
	}
`

//CardThree (breakpoin at 950px)
export const CardsThreeRow = styled.div`
	margin: 1rem 0;
	width: 100%;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	@media (max-width: 950px) {
		flex-direction: column;
	}
`

export const CardThree = styled.div`
	display: flex;
	flex-flow: column wrap;
	margin: 1rem;
	flex: 1;
	background-color: white;
	border-radius: 1rem;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
	@media (max-width: 950px) {
		flex-flow: row wrap;
		width: 100%;
		margin: 1rem 0;
	}
`

export const CardThreeImage = styled.div`
	margin: 1.5rem 2rem;
	align-self: center;
	min-width: 8rem;
	min-height: 8rem;
	width: 8rem;
	height: 8rem;
	background: ${props => `url(${props.image}) no-repeat center`};
	background-size: 100% 100%;
	@media (max-width: 950px) {
		min-width: 4rem;
		min-height: 4rem;
		width: 4rem;
		height: 4rem;
		margin: 1rem 1rem 1rem 2rem;
	}
`

export const CardThreeContent = styled.div`
	margin: auto;
	padding: 0rem 1rem;
	@media (max-width: 950px) {
		margin: auto 0;
	}
`

export const TextPlan = styled.div`
	color: #787f84;
	font-size: 1.5rem;
	font-weight: bold;
	line-height: 1.5rem;
	padding: 1rem;
`

//Review Section
export const ReviewSection = styled.div`
	display: flex;
	flex-direction: column;
	background: #f3f3f3;
	padding: 3rem 6rem;
	margin: auto;
	@media (max-width: 1024px) {
		padding: 2rem;
	}
	@media (max-width: 768px) {
		padding: 1.75rem 1rem;
	}
`

//Card Four
export const CardsFourRow = styled.div`
	margin: 2rem 0;
	width: 100%;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	@media (max-width: 1100px) {
		margin: 1rem 0;
		flex-direction: column;
	}
`

export const CardFour = styled.div`
	display: flex;
	margin: 1rem;
	flex: 1;
	background-color: white;
	border-radius: 1rem;
	&:hover {
		box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.5);
	}
`

export const Stars = styled.div`
	color: #ffda01;
`

export const StarIcon = styled(({ ...props }) => <FontAwesomeIcon icon={faStar} />)``

export const CardFourImage = styled.div`
	align-self: center;
	min-width: 8rem;
	min-height: 8rem;
	width: 8rem;
	height: 8rem;
	background: ${props => `url(${props.image}) no-repeat center`};
	background-size: 80% 80%;
`

export const CardFourContent = styled.div`
	padding: 1rem;
	display: flex;
	flex-direction: column;
`
