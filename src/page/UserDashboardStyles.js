import styled from 'styled-components'

export const Text = styled.div`
	color: ${props => (props.color ? props.color : '#787F84')};
	font-size: ${props => (props.size ? props.size : '1rem')};
	font-weight: ${props => (props.weight ? props.weight : '500')};
	line-height: ${props => (props.height ? props.height : '1.25rem')};
	text-align: ${props => (props.align ? props.align : 'left')};
`

// WelcomeSection
export const WelcomeSection = styled.div`
	display: flex;
	justify-content: space-between;
	min-height: 14rem;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
	background-color: #fff;
	border-radius: 1rem;
	overflow: hidden;
	@media (max-width: 1024px) {
		flex-direction: column;
	}
`
export const WelcomeLeft = styled.div`
	padding: 0 2.5rem;
	max-width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	@media (max-width: 1024px) {
		max-width: 100%;
		padding: 1rem;
	}
`
export const WelcomeRight = styled.div`
	flex-grow: 1;
	max-width: 60%;
	background-image: url('images/welcome.svg');
	background-repeat: no-repeat;
	background-size: cover;
	background-position: right bottom;
	@media (max-width: 1024px) {
		max-width: 100%;
		min-height: 14rem;
	}
`

// WelcomeSection
export const CardsRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
export const Card = styled.div`
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 3rem 0;
	padding: 2rem;
	border-radius: 1rem;
	background-color: #fff;
	box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.5);
`
export const CardGap = styled.div`
	height: 1rem;
`
export const CardImage = styled.div`
	height: 10rem;
	width: 10rem;
	background: ${props => `url(${props.image}) no-repeat center`};
	background-size: 100% 100%;
	margin-bottom: 1rem;
`
