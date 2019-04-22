import React, { useState } from 'react'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import Wizard from '../component/Wizard'
import CheckBox from '../component/CheckBox.js'
import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FormIcon, CheckBox2, MultiSelect } from '../component/FormikForm.js'


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
	width: 8rem;
	height: 8rem;
	background: ${props => `url(${props.image}) no-repeat center`};
	background-size: ${({ bgsize = '80%' }) => bgsize} auto;
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
    // z-index: -2;
`

export const Section = styled.div`
	margin: 0 10%;
	padding: 4rem 0;
	// z-index: -2;
`

export const NextButton = styled.div`
	align-self: flex-end;
	padding: 1rem 0;
	@media (max-width: 950px) {
		align-self: center;
	}
`

export const ButtonContainer = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
`

export default class PlanPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1,
			setDefaultBilling: null,
			errors: {
				setDefaultBilling: null
			}
		}

		this.test = this.test.bind(this);
		this._next = this._next.bind(this);
        this._prev = this._prev.bind(this);
	}

	test() {
		console.log('hello');
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
				<NextButton>
					<CTAButton onClick={this._prev}>BACK</CTAButton>
				</NextButton>
            )
        }
        if (currentStep === 1) {
            return (
				<NextButton>
					<CTAButton onClick={this._prev} disabled>BACK</CTAButton>
				</NextButton>
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
					<Wizard totalSteps={5} />
					<CardsTwoRow>
						<CardTwo>
							<CardTwoImage image='/images/ico-calendarDay.svg' />
						</CardTwo>

						<CardTwo>
							<CardTwoImage image='/images/ico-calendarMonth.svg' />
						</CardTwo>

						<CardTwo>
							<CardTwoImage image='/images/ico-calendarYear.svg' />
						</CardTwo>
					</CardsTwoRow>

					<input type="checkbox"  />
					{c.t("I agree with terms and conditions")}

					<ButtonContainer>
						{this.previousButton}
						{this.nextButton}
					</ButtonContainer>
				</ContainerBox>

				<Section>
					<HeaderWithBar color='#787F84' padding='1rem 0 0'>{c.t('Frequently Asked Questions')}</HeaderWithBar>
				</Section>
			</React.Fragment>
		)
	}
}


// import React from "react"
// import styled from 'styled-components'
// import { I18n } from 'react-i18next'
// import Wizard from '../component/Wizard'

// import {
// 	Background,
// 	ContrastedCTAButton,
// 	HeaderWithBar,
// 	Text,
// 	ClickableText,
// 	CTAButton
// } from '../component/BasicComponents.js'

// const ContainerBox = styled.div`
//     background-color: white;
//     border-radius: 16px;
//     margin: 3% 10%;
//     padding: 4rem 3rem;
//     // z-index: -2;
// `

// class PlanPage extends React.Component {

// 	constructor(props) {
// 		super(props)
// 		this.test = this.test.bind(this)
// 	}

// 	test() {
// 		console.log('ghere');
// 	}

// 	render() {
// 		const g = this.props.login
// 		const c = this.props.i18n

// 		return (
// 			<ContainerBox>
// 				<HeaderWithBar color='#787F84' padding='1rem 0 0'>{c.t('Choose Your Plan')}</HeaderWithBar>
// 				<Text color='#787F84' align='left'>
// 					{c.t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate')}
// 				</Text>
// 				<CTAButton onClick={this.test}>{c.t('Next')}</CTAButton>

// 			</ContainerBox>
// 		)
// 	}
// }

// export default PlanPage