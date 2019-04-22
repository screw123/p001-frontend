import React, { useState } from 'react'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import Wizard from '../component/Wizard'
import WizardStep from '../component/WizardStep'
import CheckBox from '../component/SimpleCheckBox.js'


import {
	Background,
	ContrastedCTAButton,
	HeaderWithBar,
	Text,
	ClickableText,
	CTAButton
} from '../component/BasicComponents.js'

const totalSteps = 5;

//CardTwo
export const CardsTwoRow = styled.div`
	margin: 2rem 0;
	width: 100%;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
	@media (max-width: 768px) {
		margin: 1rem 0;
		flex-direction: column;
	}
`

export const CardTwo = styled.div`
	display: flex;
	margin: 1rem 0;
	max-width: 22rem;
	@media (max-width: 768px) {
		background-color: white;
		border-radius: 1rem;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
	}
`

export const CardTwoImage = styled.div`
	align-self: center;
	min-width: 8rem;
	min-height: 8rem;
	padding: 1rem 2rem;
	
	img {
		display: block;
		margin-bottom: 1.5rem;
	}
	
	p {
		color: #787F84;
		display: block;
		font-weight: bold;
		margin: 0;
		text-align: center;
	}

	@media (min-width: 1101px) {
		background-color: white;
		border-radius: 1rem;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
	}
`

const ContainerBox = styled.div`
    background-color: white;
    border-radius: 16px;
    margin: 3% 10%;
    padding: 4rem 3rem;
    z-index: 1;
`

export const Section = styled.div`
	margin: 0 10%;
	padding: 4rem 0;
`

export const NextButton = styled.div`
	float: right;
	align-self: flex-end;
	padding: 1rem 0;
	@media (max-width: 950px) {
		align-self: center;
	}
`

export const BackButton = styled.div`
	align-self: flex-end;
	padding: 1rem 0;
	@media (max-width: 950px) {
		align-self: center;
	}
`

export default class PlanPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1,
			isChecked: true
		}
		this._next = this._next.bind(this);
		this._prev = this._prev.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	_next() {
		let currentStep = this.state.currentStep;
		currentStep = currentStep >= totalSteps ? (totalSteps + 1) : (currentStep + 1);
		this.setState({
			currentStep: currentStep
		})
	}

	_prev() {
		let currentStep = this.state.currentStep;
		currentStep = currentStep <= 1 ? 1 : currentStep - 1;
		this.setState({
			currentStep: currentStep
		})
	}

	get previousButton() {
		let currentStep = this.state.currentStep;
		if (currentStep >= 2) {
			return (
				<BackButton>
					<CTAButton onClick={this._prev}>BACK</CTAButton>
				</BackButton>
			)
		}

		return null
	}

	get nextButton() {
		let currentStep = this.state.currentStep;
		if (currentStep < totalSteps) {
			return (
				<NextButton>
					<CTAButton onClick={this._next}>Next</CTAButton>
				</NextButton>
			)
		}

		return null
	}

	handleChange () {
        this.setState({isChecked: !this.state.isChecked}, () => console.log(this.state.isChecked));
    };

	render() {
		// const [redirectPath, setRedirectPath] = useState(undefined)

		const g = this.props.login
		const c = this.props.i18n

		return (
			<React.Fragment>
				<ContainerBox>
					<HeaderWithBar color='#787F84' padding='1rem 0 0'>{c.t('Choose Your Plan')}</HeaderWithBar>
					<Text color='#787F84' align='left'>
						{c.t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate')}
					</Text>
					<Wizard totalSteps={5} currentStep={this.state.currentStep}>
						<WizardStep currentStep={this.state.currentStep} step={1}>
							<CardsTwoRow>
								<CardTwo>
									<CardTwoImage>
										<img src="images/ico-calendarDay.svg" alt=""/>
										<p>Daily</p>
									</CardTwoImage>
								</CardTwo>

								<CardTwo>
									<CardTwoImage>
										<img src="images/ico-calendarMonth.svg" alt=""/>
										<p>Monthly</p>
									</CardTwoImage>
								</CardTwo>

								<CardTwo>
									<CardTwoImage>
										<img src="images/ico-calendarYear.svg" alt=""/>
										<p>Yeary</p>
									</CardTwoImage>
								</CardTwo>
							</CardsTwoRow>

							<p>
								<CheckBox
									name="termsAndConditions"
									onChange={this.handleChange}
									isChecked={this.setState.isChecked}
									label="I agree with terms and conditions"
								/>
							</p>
						</WizardStep>

						<WizardStep currentStep={this.state.currentStep} step={2}>
							<h2>Step 2</h2>
						</WizardStep>

						<WizardStep currentStep={this.state.currentStep} step={3}>
							<h2>Step 3 </h2>
						</WizardStep>

						<WizardStep currentStep={this.state.currentStep} step={4}>
							<h2>Step 4 </h2>
						</WizardStep>

						<WizardStep currentStep={this.state.currentStep} step={5}>
							<h2>Step 5 </h2>
						</WizardStep>
					</Wizard>

					<div>
						{this.nextButton}
						{this.previousButton}
					</div>
				</ContainerBox>

				<Section>
					<HeaderWithBar color='#787F84' padding='1rem 0 0'>{c.t('Frequently Asked Questions')}</HeaderWithBar>
				</Section>
			</React.Fragment>
		)
	}
}
