import union from "lodash/union"
import React from "react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import {
	Background,
	CTAButton,
	Header3,
	HeaderWithBar,
	Text,
	ClickableText
} from "../component/BasicComponents.js"
import FAQSection from "../component/FAQSection.js"
import { MultiSelect } from "../component/FormikForm.js"
import PowerModal from "../component/PowerModal"
import CheckBox from "../component/SimpleCheckBox.js"
import Wizard from "../component/Wizard"
import WizardStep from "../component/WizardStep"
import ConfirmOrderForm from "../form/ConfirmOrderForm"
import OrderBoxForm from "../form/OrderBoxForm"
import QuotationForm from "../form/QuotationForm-old.js"
import {
	WizardStep1,
	WizardStep2,
	WizardStep3,
	WizardStep4
} from "../form/QuotationForm.js"

import { CardsTwoRow, CardTwo } from "./IndexPageStyles.js"

class QuotationPage1 extends React.Component {
	constructor(props) {
		super(props)
		this.changeAcct = this.changeAcct.bind(this)
		this.quotationCreated = this.quotationCreated.bind(this)
		const acctList = union(
			this.props.login.state.myself.accountOwn_id === null
				? []
				: this.props.login.state.myself.accountOwn_id.map(v => {
						return { value: v._id, label: v.name }
				  }),
			this.props.login.state.myself.accountManage_id === null
				? []
				: this.props.login.state.myself.accountManage_id.map(v => {
						return { value: v._id, label: v.name }
				  })
		)
		this.state = {
			selectedAcct: acctList.length > 0 ? acctList[0].value : "",
			acctList: acctList,
			quotation: undefined
		}
	}

	changeAcct(e, v) {
		this.setState({ selectedAcct: v })
	}

	quotationCreated = q => this.setState({ quotation: q })

	render() {
		const g = this.props.login
		const c = this.props.i18n
		return (
			<Background>
				{/* if not logined, show QuoationForm with empty account_id */}
				{/* else, show a selector and account_id */}
				{g.state.isLogined && this.state.acctList.length > 1 && (
					<MultiSelect
						field={{
							name: "acct",
							value: this.state.selectedAcct
						}}
						form={{
							setFieldValue: this.changeAcct
						}}
						multiSelect={false}
						label={c.t("Please choose your account") + ":"}
						options={this.state.acctList}
					/>
				)}
				{!this.state.quotation && (
					<QuotationForm
						account_id={this.state.selectedAcct}
						onAddQuotationSuccess={this.quotationCreated}
						{...this.props}
					/>
				)}
				{this.state.quotation && (
					<Redirect
						push
						to={{
							pathname: "/confirmSalesOrder",
							state: { quotation: this.state.quotation }
						}}
					/>
				)}
			</Background>
		)
	}
}

const totalSteps = 4

const BigIcon = styled.div`
	align-self: center;
	min-width: 8rem;
	min-height: 8rem;
	padding: 1rem 2rem;

	img {
		display: block;
		margin: 0 auto 1.5rem;
	}

	@media (min-width: 1101px) {
		background-color: white;
		border-radius: 1rem;
		box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.5);
	}
`

const CardBox = styled(CardTwo)`
	min-width: 20.8rem;
	max-width: 20.8rem;
`

const CardBoxImage = styled(BigIcon)`
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
	padding: 4rem 1rem;

	@media screen and (min-width: 768px) {
		margin: 3% 10%;
		padding: 4rem 3rem;
	}
`

const BackButton = styled.div`
	align-self: flex-end;
	padding: 1rem 0;
	@media (max-width: 950px) {
		align-self: center;
	}
`

const NextButton = styled(BackButton)`
	float: right;
`

const ModalTitle = styled.p`
	color: #787f84;
	font-size: 34px;
	font-weight: 500;

	@media screen and (min-width: 1200px) {
		font-size: 48px;
	}
`

const ModalDetails = styled.span`
	color: #787f84;
	font-size: 18px;
`

const ModalImage = styled.div`
	margin-bottom: 1rem;

	img {
		width: 120px;
	}

	@media screen and (min-width: 1024px) {
		img {
			width: initial;
		}
	}
`

class QuotationPage extends React.Component {
	constructor(props) {
		super(props)
		this.changeAcct = this.changeAcct.bind(this)
		this.quotationCreated = this.quotationCreated.bind(this)
		const acctList = union(
			this.props.login.state.myself.accountOwn_id === null
				? []
				: this.props.login.state.myself.accountOwn_id.map(v => {
						return { value: v._id, label: v.name }
				  }),
			this.props.login.state.myself.accountManage_id === null
				? []
				: this.props.login.state.myself.accountManage_id.map(v => {
						return { value: v._id, label: v.name }
				  })
		)

		this.state = {
			currentStep: 1,
			promoCode: null,
			account_id: null,
			isAgreeTnC: false,
			
			
			isShowConfirmModal: false,
			acctList: acctList,
			products: {
				documentBox: 0,
				documentBoxSecond: 0,
				documentBox3: 0
			},
			
		}
		this._next = this._next.bind(this)
		this._prev = this._prev.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	
	changeAcct = (e, v) => this.setState({ account_id: v })
	quotationCreated = q => this.setState({ quotation: q })
	
	openModalHandler = () => {
		this.setState({
			isShowConfirmModal: true
		})
	}

	closeModalHandler = () => {
		this.setState({
			isShowConfirmModal: false
		})
	}

	_next() {
		let currentStep = this.state.currentStep
		currentStep =
			currentStep >= totalSteps ? totalSteps + 1 : currentStep + 1
		this.setState({
			currentStep: currentStep
		})

		if (this.state.isShowConfirmModal) {
			this.setState({
				currentStep: currentStep,
				isShowConfirmModal: false
			})
		} else {
			this.setState({
				currentStep: currentStep
			})
		}
	}

	_prev() {
		let currentStep = this.state.currentStep
		currentStep = currentStep <= 1 ? 1 : currentStep - 1
		this.setState({
			currentStep: currentStep
		})
	}

	get previousButton() {
		let currentStep = this.state.currentStep
		if (currentStep >= 2) {
			return (
				<BackButton>
					<CTAButton width={"auto"} color onClick={this._prev}>
						Back
					</CTAButton>
				</BackButton>
			)
		}
		return null
	}

	get nextButton() {
		let currentStep = this.state.currentStep
		if (currentStep <= totalSteps) {
			if (this.state.currentStep === 3) {
				return (
					<NextButton>
						<CTAButton
							width={"auto"}
							onClick={this.openModalHandler}
						>
							Next
						</CTAButton>
					</NextButton>
				)
			} else if (this.state.currentStep === 5) {
				return (
					<NextButton>
						<CTAButton width={"auto"}>Order</CTAButton>
					</NextButton>
				)
			} else {
				return (
					<NextButton>
						<CTAButton width={"auto"} onClick={this._next}>
							Next
						</CTAButton>
					</NextButton>
				)
			}
		}
		return null
	}

	addControlFnc(action, product) {
		if (action === "add") {
			this.setState({
				products: Object.assign({}, this.state.products, {
					[product]: this.state.products[product] + 1
				})
			})
		}

		if (action === "subs") {
			if (this.state.products[product] > 0) {
				this.setState({
					products: Object.assign({}, this.state.products, {
						[product]: this.state.products[product] - 1
					})
				})
			} else return false
		}
	}

	handleChange() {
		this.setState({ isChecked: !this.state.isChecked })
	}

	handleInputChange(event) {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			form: Object.assign({}, this.state.form, {
				[name]: value
			})
		})
	}

	render() {
		// const [redirectPath, setRedirectPath] = useState(undefined)

		const g = this.props.login
		const c = this.props.i18n

		return (
			<>
			{g.state.isLogined && this.state.acctList.length > 1 && (
				<MultiSelect
					field={{
						name: "acct",
						value: this.state.selectedAcct
					}}
					form={{
						setFieldValue: this.changeAcct
					}}
					multiSelect={false}
					label={c.t("Please choose your account") + ":"}
					options={this.state.acctList}
				/>
			)}
			
				<ContainerBox>
					<HeaderWithBar color="#787F84" padding="1rem 0 0">
						{c.t("Choose Your Plan")}
					</HeaderWithBar>
					<Wizard totalSteps={4} currentStep={this.state.currentStep}>
						<WizardStep1
							currentStep={this.state.currentStep}
							c={c}
							promoCode={this.state.promoCode}

						/>

						<WizardStep2
							currentStep={this.state.currentStep}
							c={c}
						/>

						<WizardStep3
							currentStep={this.state.currentStep}
							c={c}
						/>

						<WizardStep4
							currentStep={this.state.currentStep}
							c={c}
						/>
					</Wizard>

					<div>
						{this.nextButton}
						{this.previousButton}
					</div>
				</ContainerBox>

				<FAQSection c={c} />

				{this.state.isShowConfirmModal && (
					<PowerModal
						className="modal"
						show={this.state.isShowConfirmModal}
						close={this.closeModalHandler}
						header={"Modal"}
						BtnConfirm={"Confirm"}
						BtnClose={"Add more Items"}
						Action={this._next}
						Btn={true}
					>
						<ModalImage>
							<img src="images/ico-info.svg" alt="" />
						</ModalImage>
						<ModalTitle>Your monthly bill is $0</ModalTitle>
						<ModalDetails>(minimum spend applies).</ModalDetails>
					</PowerModal>
				)}
			</>
		)
	}
}

export default QuotationPage
