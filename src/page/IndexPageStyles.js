import styled from 'styled-components'

export const TopSection = styled.div`
	position: relative;
	display: flex;
	flex-flow: column wrap;
	align-items: flex-start;
	min-height: 80vh;
	padding: 3rem 55% 0 6rem;
	background: linear-gradient(180deg, #f43ea6 0%, #f5576c 100%);
	@media (max-width: 1200px) {
		padding-right: 45%;
	}
	@media (max-width: 1024px) {
		padding-left: 2rem;
	}
	@media (max-width: 900px) {
		padding-right: 25%;
	}
	@media (max-width: 768px) {
		min-height: 60vh;
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
`
