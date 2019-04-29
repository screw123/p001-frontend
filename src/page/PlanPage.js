import React from 'react'
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import Wizard from '../component/Wizard'
import WizardStep from '../component/WizardStep'
import CheckBox from '../component/SimpleCheckBox.js'
import FAQs from '../component/FAQs'
import PowerModal from '../component/PowerModal'
import AddControl from '../component/AddProductControl'
import OrderBoxForm from '../form/OrderBoxForm';
import ConfirmOrderForm from '../form/ConfirmOrderForm';

import {
	HeaderWithBar,
	Text,
	Header3,
	CTAButton
} from '../component/BasicComponents.js'

const totalSteps = 5;

//CardTwo
export const CardsTwoRow = styled.div`
	margin: ${props => (props.margin ? props.margin : '1rem 0')};
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
		margin: 0 auto 1.5rem;
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

export const CardBox = styled(CardTwo)`
	min-width: 20.8rem;
	max-width: 20.8rem;
`

export const CardBoxImage = styled(CardTwoImage)`
	min-width: 100%;
	padding: 1.5rem 2rem;

	img {
		height: 175px;
		margin-bottom: 1rem;
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
export const ServiceTitle = styled.h3`
	color: ${props => (props.color ? props.color : '787F84')};
	margin: 1rem 0 0;
	text-align: center;
`

export const ClickableText = styled.span`
	display: block;
	font-weight: 600;
	cursor: pointer;
	font-size: 1rem;
	line-height: 1.5rem;
	padding: 0 0.2rem 0 0.2rem;
	margin: 0.3rem 0 0.5rem;
	text-align: center;
	color: #E61D6E;
	@media (max-width: 768px) {
		line-height: 1.1rem;
	}
`

export const PromoContainer = styled.div`
	margin: 2rem 0;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	p {
		color: #787F84;	
		font-size: 1rem;
		font-weight: bold;
		line-height: 23px;
	}
`

export const PromoInput = styled.input`
	background-color: #F4F4F4;
	border: none;
	border-radius: 28.5px;
	font-size: 1rem;
	height: 57px;
	padding: 0 2rem;
	width: 100%;	

	&:focus {
		border: none;
		box-shadow: none;
		outline: none;
	}
`

export const CostContainer = styled.div`
	border-top: 2px solid #E61D6E;
	border-bottom: 2px solid #E61D6E;
	padding-left: 1.5rem;
	padding-right: 1.5rem;

	div {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
	}

	h3 {
		color: #787F84;
		margin: 0;
	}
`

export const Cost = styled.h3`
	color: #E61D6E !important;
	font-size: 1.5rem;
	font-weight: bold;
`

const ModalTitle = styled.p`
	color: #787F84;
	font-size: 48px;
	font-weight: 500;
`
const ModalDetails= styled.span`
	color: #787F84;
	font-size: 18px;
`

const GridContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding-top: 2rem;

	@media screen and (min-width: 1024px) {
		margin: 0 auto;
		width: 75%;
	}
`

const GridColumn = styled.div`
	width: 100%;
	margin: ${props => props.margin ? props.margin : '0'};
	@media screen and (min-width: 768px) {
		width: calc(50% - 0.8rem);
	}
`

const OrderCard = styled(CardTwoImage)`
	box-shadow: ${props => props.shadow ? props.shadow : '0 0 1rem rgba(0, 0, 0, 0.5);'};
    border: ${props => props.Border ? props.Border : 'none;'};
	@media screen and (min-width: 768px) {
		margin: 0 auto;
		max-width: 359px;
	}
`

const OrderCardRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: ${props => props.margin ? props.margin : '0 0 1rem'};

	&.divider {
		border-bottom: 1px solid #979797;
		padding-bottom: 1.5rem;
	}

	small {
		font-size: 16px;
	}

	small.disclaimer {
		font-size: 0.7rem;
	}
`

const EditCard = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	img {
		height: 21px;
		margin: -2px 0 0 10px;
		width: 20px
	}
	
`

export default class PlanPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 5,
			isChecked: true,
			isShowing: false,
			generalFaqs: [
				{title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
				{title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
				{title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
			],
			itemFaqs: [
				{title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
				{title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
				{title: "Lorem ipsum dolor sit amet?", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor. Ut eget imperdiet neque. In volutpat ante semper diam molestie, et aliquam erat laoreet. Sed sit amet arcu aliquet, molestie justo at, auctor nunc. Phasellus ligula ipsum, volutpat eget semper id, viverra eget nibh. Suspendisse luctus mattis cursus. Nam consectetur ante at nisl hendrerit gravida."},
			],
			products: {
				documentBox: 0,
				documentBoxSecond: 0,
				documentBox3: 0
			},
			form:{
				promoCode: ''
			}
		}
		this._next = this._next.bind(this);
		this._prev = this._prev.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	openModalHandler = () => {
		this.setState({
			isShowing: true
		});
	}

	closeModalHandler = () => {
		this.setState({
			isShowing: false
		});
	}

	_next() {
		let currentStep = this.state.currentStep;
		currentStep = currentStep >= totalSteps ? (totalSteps + 1) : (currentStep + 1);
		this.setState({
			currentStep: currentStep,
		})

		if(this.state.isShowing) {
			this.setState({
				currentStep: currentStep,
				isShowing: false
			})
		}
		else {
			this.setState({
				currentStep: currentStep,
			})
		}
		
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
				<BackButton >
					<CTAButton color onClick={this._prev}>Back</CTAButton>
				</BackButton>
			)
		}

		return null
	}

	get nextButton() {
		let currentStep = this.state.currentStep;
		if (currentStep <= totalSteps) {
			if (this.state.currentStep === 3) {
	 				return (
						<NextButton>
							<CTAButton onClick={this.openModalHandler}>Next</CTAButton>
						</NextButton>
					)
			} else if (this.state.currentStep === 5) {
				return(
	  				<NextButton>
						<CTAButton>Order</CTAButton>
					</NextButton>
				)
			} else {
				return(
	  				<NextButton>
						<CTAButton onClick={this._next}>Next</CTAButton>
					</NextButton>
				)
			}
		}
		return null
	}

	addControlFnc(action, product) {
		if(action === 'add') {
			this.setState({
				products: Object.assign({}, this.state.products, {
					[product]: this.state.products[product] + 1
				})
			})
		}

		if(action === 'subs') {
			if(this.state.products[product] > 0) {
				this.setState({
					products: Object.assign({}, this.state.products, {
						[product]: this.state.products[product] - 1
					})
				})
			} else return false
		}
	} 

	handleChange () {
        this.setState({isChecked: !this.state.isChecked});
	};
	
	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			form: Object.assign({}, this.state.form, {
				[name]: value
			})
		});
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
							<Text color='#787F84' align='center' width="100%">
								{c.t('Select a Service')}
							</Text>
							<CardsTwoRow margin="0">
								<CardBox>
									<CardBoxImage>
										<img src="images/ico-box.svg" alt =""/>
										<Text color='#787F84' align='center'>
											{c.t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor.')}
										</Text>
										<ServiceTitle>
											{c.t('BY BOX')}
										</ServiceTitle>
									</CardBoxImage>
								</CardBox>
							</CardsTwoRow>
						</WizardStep>

						<WizardStep currentStep={this.state.currentStep} step={3}>
							<Text color='#787F84' align='center' width="100%">
								{c.t('Select a Product')}
							</Text>
							<CardsTwoRow margin="0">
								<CardBox>
									<CardBoxImage>
										<img src="images/ico-box.svg" alt =""/>
										<p>Document Box</p>
										<Text color='#787F84' align='center'>
											{c.t('$0 box/month')}
										</Text>
										<ClickableText color="#E61D6E" align="center" display="block">
											{c.t('View details')}
										</ClickableText>
										<AddControl
											total={this.state.products.documentBox}
											clickAdd={() => this.addControlFnc('add', 'documentBox')}
											clickSubs={() => this.addControlFnc('subs', 'documentBox')}
										/>
									</CardBoxImage>
								</CardBox>

								<CardBox>
									<CardBoxImage>
										<img src="images/ico-box.svg" alt =""/>
										<p>Document Box</p>
										<Text color='#787F84' align='center'>
											{c.t('$0 box/month')}
										</Text>
										<ClickableText color="#E61D6E" align="center" display="block">
											{c.t('View details')}
										</ClickableText>
										<AddControl
											total={this.state.products.documentBoxSecond}
											clickAdd={() => this.addControlFnc('add', 'documentBoxSecond')}
											clickSubs={() => this.addControlFnc('subs', 'documentBoxSecond')}
										/>
									</CardBoxImage>
								</CardBox>

								<CardBox>
									<CardBoxImage>
										<img src="images/ico-box.svg" alt =""/>
										<p>Document Box</p>
										<Text color='#787F84' align='center'>
											{c.t('$0 box/month')}
										</Text>
										<ClickableText color="#E61D6E" align="center" display="block">
											{c.t('View details')}
										</ClickableText>
										<AddControl
											total={this.state.products.documentBox3}
											clickAdd={() => this.addControlFnc('add', 'documentBox3')}
											clickSubs={() => this.addControlFnc('subs', 'documentBox3')}
										/>
									</CardBoxImage>
								</CardBox>
							</CardsTwoRow>
							<PromoContainer>
								<p>Do you have a Promo Code?</p>
								<PromoInput type="text" placeholder="Promo Code" value={this.state.form.promoCode} name="promoCode" onChange={(e)=>this.handleInputChange(e)} />
							</PromoContainer> 
							<CostContainer>
								<div>
									<h3>Monthly Cost Estimate</h3>

									<Cost>
										$0
									</Cost>
								</div>
							</CostContainer>

							{ this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }
							<PowerModal
								className="modal"
								show={this.state.isShowing}
								close={this.closeModalHandler}
								header={'Modal'}
								BtnConfirm={'Confirm'}
								BtnClose={'Add more Items'}
							 	Action = {this._next}
							 	Btn = {true}
								>
									<img src="images/ico-info.svg" alt=""/>
									<ModalTitle>Your monthly bill is $0</ModalTitle>
									<ModalDetails>(minimum spend applies).</ModalDetails>
							</PowerModal>


						</WizardStep>

						<WizardStep currentStep={this.state.currentStep} step={4}>
							<Text color='#787F84' align='center' width="100%">
								{c.t('Select a Booking')}
							</Text>
							<GridContainer>
								<GridColumn>
									<OrderBoxForm c={c}/>
								</GridColumn>
								<GridColumn>
									<OrderCard>
										<OrderCardRow margin='0 0 1.3rem'>
											<Text color='#787F84' align='left' fontWeight='bold'>
												<small>{c.t('Your Order')}</small>
											</Text>
											<EditCard>
												<Text color='#787F84' align='left'>
													<small>{c.t('Edit')}</small>
												</Text>
												<img src="images/ico-edit.svg" alt=""/>
											</EditCard>
										</OrderCardRow>

										<OrderCardRow >
											<Text color='#787F84' align='left' fontWeight='bold'>
												<small>{c.t('1 x Document Box')}</small>
											</Text>
											<Text color='#E61D6E' align='left' fontWeight='bold'>
												<small>{c.t('$0')}</small>
											</Text>
										</OrderCardRow>

										<OrderCardRow className="divider">
											<Text color='#787F84' align='left'>
												<small>{c.t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate')}</small>
											</Text>
										</OrderCardRow>

										<OrderCardRow >
											<Text color='#787F84' align='left'>
												<small className="disclaimer">{c.t('Lorem Ipsum dolor sit amet, consectetur')}</small>
											</Text>
											<Text color='#E61D6E' align='left' fontWeight='bold'>
												<small>{c.t('$0')}</small>
											</Text>
										</OrderCardRow>
									</OrderCard>
								</GridColumn>
							</GridContainer>
						</WizardStep>

						<WizardStep currentStep={this.state.currentStep} step={5}>
							<Text color='#787F84' align='center' width="100%">
								{c.t('Secure Payment')}

							<GridContainer>
								<GridColumn>
									<ConfirmOrderForm c={c}/>
								</GridColumn>
								<GridColumn>
									<OrderCard>
										<OrderCardRow margin='0 0 1.3rem'>
											<Text color='#787F84' align='left' fontWeight='bold'>
												<small>{c.t('Your Order')}</small>
											</Text>
											<EditCard>
												<Text color='#787F84' align='left'>
													<small>{c.t('Edit')}</small>
												</Text>
												<img src="images/ico-edit.svg" alt=""/>
											</EditCard>
										</OrderCardRow>

										<OrderCardRow >
											<Text color='#787F84' align='left' fontWeight='bold'>
												<small>{c.t('1 x Document Box')}</small>
											</Text>
											<Text color='#E61D6E' align='left' fontWeight='bold'>
												<small>{c.t('$0')}</small>
											</Text>
										</OrderCardRow>

										<OrderCardRow className="divider">
											<Text color='#787F84' align='left'>
												<small>{c.t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate')}</small>
											</Text>
										</OrderCardRow>

										<OrderCardRow >
											<Text color='#787F84' align='left'>
												<small className="disclaimer">{c.t('Lorem Ipsum dolor sit amet, consectetur')}</small>
											</Text>
											<Text color='#E61D6E' align='left' fontWeight='bold'>
												<small>{c.t('$0')}</small>
											</Text>
										</OrderCardRow>
									</OrderCard>
								</GridColumn>
							</GridContainer>

							<GridContainer>
								<GridColumn margin='0 1%'>
									<OrderCard Border='1px solid #DFDFDF' shadow='none'>
										<OrderCardRow margin='0 0 1.3rem' className="divider">
											<Text color='#787F84' align='left' fontWeight='bold'>
												<small>{c.t('Appointment Address')}</small>
											</Text>
											<EditCard>
												<Text color='#787F84' align='left'>
													<small>{c.t('Edit')}</small>
												</Text>
												<img src="images/ico-edit.svg" alt=""/>
											</EditCard>
										</OrderCardRow>
										<OrderCardRow margin='0'>
											<Text color='#787F84' align='left'>
												<small>{c.t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate')}</small>
											</Text>
										</OrderCardRow>
										<OrderCardRow margin='0'>
											<Text fontWeight='600' color='#787F84' align='left'>
												<small>{c.t('Big Wave Bay, Hong Kong Island')}</small>
											</Text>
										</OrderCardRow>
										<OrderCardRow margin='0'>
											<Text size='0.8rem' color='#787F84' align='left'>
												{c.t('Big Wave Bay, Hong Kong Island')}
											</Text>
										</OrderCardRow>
									</OrderCard>
								</GridColumn>
								<GridColumn margin='0 1%'>
									<OrderCard Border='1px solid #DFDFDF' shadow='none'>
										<OrderCardRow margin='0 0 1.3rem' className="divider">
											<Text color='#787F84' align='left' fontWeight='bold'>
												<small>{c.t('Drop-off of boxes')}</small>
											</Text>
											<EditCard>
												<Text color='#787F84' align='left'>
													<small>{c.t('Edit')}</small>
												</Text>
												<img src="images/ico-edit.svg" alt=""/>
											</EditCard>
										</OrderCardRow>
										<OrderCardRow>
											<Text color='#787F84' align='left'>
												<small>{c.t('Friday, 8 March, 2019 18 00 - 21 00')}</small>
											</Text>
										</OrderCardRow>
									</OrderCard>
								</GridColumn>
								<GridColumn margin='0 1%'>
									<OrderCard Border='1px solid #DFDFDF' shadow='none'>
										<OrderCardRow margin='0 0 1.3rem' className="divider">
											<Text color='#787F84' align='left' fontWeight='bold'>
												<small>{c.t('Pick-up for storage')}</small>
											</Text>
											<EditCard>
												<Text color='#787F84' align='left'>
													<small>{c.t('Edit')}</small>
												</Text>
												<img src="images/ico-edit.svg" alt=""/>
											</EditCard>
										</OrderCardRow>
										<OrderCardRow>
											<Text color='#787F84' align='left'>
												<small>{c.t('Friday, 8 March, 2019 18 00 - 21 00')}</small>
											</Text>
										</OrderCardRow>
									</OrderCard>
								</GridColumn>
							</GridContainer>


							</Text>
						</WizardStep>
					</Wizard>

					<div>
						{this.nextButton}
						{this.previousButton}
					</div>
				</ContainerBox>

				<Section>
					<HeaderWithBar color='#787F84' padding='1rem 0 0'>{c.t('Frequently Asked Questions')}</HeaderWithBar>
					<Header3 color='#787F84' align='center' margin="4rem 0" width="100%">
						{c.t('General')}
					</Header3>

					<FAQs faqs={this.state.generalFaqs}></FAQs>

					<Header3 color='#787F84' align='center' margin="0 0 4rem" width="100%">
						{c.t('Item')}
					</Header3>
					<FAQs faqs={this.state.itemFaqs}></FAQs>
				</Section>
			</React.Fragment>
		)
	}
}
