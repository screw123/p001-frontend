import styled from 'styled-components'

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


export const CardImage = styled.div`
	min-height: 10rem;
	min-width: 10rem;
	background: ${props => `url(${props.image}) no-repeat center`};
	background-size: 100% auto;
	margin-bottom: 1rem;
`
