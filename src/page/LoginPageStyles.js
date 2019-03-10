import styled from 'styled-components'

export const Container = styled.div`
	display: flex;
	border-radius: 16px;
	box-shadow: 6px 6px 48px 3px rgba(230, 29, 110, 0.4);
	min-height: 70vh;
`
export const LeftSide = styled.div`
	flex: 1;
	padding: 4rem;
	color: #787f84;
	@media (max-width: 1200px) {
		padding: 2rem;
	}
`
export const RightSide = styled.div`
	flex: 1;
	padding: 4rem;
	border-radius: 1rem;
	background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: 1200px) {
		padding: 2rem;
	}
	@media (max-width: 768px) {
		display: none;
	}
`
export const Para = styled.p`
	margin: 0 0 0.75rem 0;
	font-size: 1rem;
	line-height: 1.25rem;
	color: ${props => props.color};
	text-align: ${props => props.align};
`
export const Title = styled.p`
	margin: 0 0 0.5rem 0;
	font-size: 3rem;
	font-weight: 500;
	line-height: 3.75rem;
	color: ${props => props.color};
	text-align: ${props => props.align};
`

export const SignUp = styled.button`
	font-size: 1.5rem;
	line-height: 1.75rem;
	font-weight: 600;
	border-radius: 3rem;
	margin: 0.5rem 1rem;
	padding: 0.75rem 2.5rem;
	min-width: 12rem;
	max-width: 100%;
	background-color: #ffffff;
	border: none;
	color: #e61d6e;
	&:hover {
		background-color: #ffffff;
	}
`
