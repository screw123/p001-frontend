import union from "lodash/union"
import React from "react"
import { Redirect } from "react-router-dom"
import { getPriceListByAccount, getPriceListByCode, addQuotation } from '../gql/query.js'
import styled from "styled-components"
import {
	Background,
	CTAButton,
	HeaderWithBar,
	Text,
	ClickableText,
	Section
} from "../component/BasicComponents.js"
import FAQSection from "../component/FAQSection.js"
import { MultiSelect } from "../component/FormikForm.js"
import PowerModal from "../component/PowerModal"
import Wizard from "../component/Wizard"
import WizardStep from "../component/WizardStep"
import ConfirmOrderForm from "../form/ConfirmOrderForm"
import OrderBoxForm from "../form/OrderBoxForm"
import QuotationForm from "../form/QuotationForm-old.js"
import {
	WizardStep1,
	WizardStep2,
	WizardStep3,
	WizardStep4,
	PromoCodeForm
} from "../form/QuotationForm.js"
import { CardsTwoRow, CardTwo } from "./IndexPageStyles.js"

import parseApolloErr from '../util/parseErr.js'

import merge from 'lodash/merge'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

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
			isHavePromo: false,
			acctList: acctList,
			loadingPriceList: false,
			priceList: {},
			promoCodeEntry: '',
			products: {
				documentBox: 0,
				documentBoxSecond: 0,
				documentBox3: 0
			}
		}
		this.changeAcct = this.changeAcct.bind(this)
		this.quotationCreated = this.quotationCreated.bind(this)
		this._next = this._next.bind(this)
		this._prev = this._prev.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.toggleIsHavePromo = this.toggleIsHavePromo.bind(this)
	}

	changeAcct = (e, v) => this.setState({ account_id: v })
	quotationCreated = q => this.setState({ quotation: q })
	toggleIsHavePromo = () => this.setState({ isHavePromo: !this.state.isHavePromo })
	openModalHandler = () => this.setState({isShowConfirmModal: true})
	closeModalHandler = () => this.setState({isShowConfirmModal: false})

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

	getCouponPriceList = async (gqlClient, t) => {
        this.setState({loadingPriceList: true})
        try {
            const d = await gqlClient.query({
                query: getPriceListByCode,
                variables: {account_id: this.props.account_id || '', code: this.state.promoCodeEntry}
            })
            const fullPriceList = this.transformPriceList(d.data)
            this.setState({priceList: fullPriceList, loadingPriceList: false, promoCode: this.state.couponCodeEntry, couponErr: undefined})
		}
        catch(e) {
            const errStack = parseApolloErr(e, t)
            for(let i=0;i<errStack.length;i++) {
                if (errStack[i].type==='NOT_FOUND') {
                    this.setState({promoCodeError: t('Coupon Code is invalid or expired'), loadingPriceList: false, couponCode: ''})
				}
            }
        }
	}

	transformPriceList = (d) => { //to transform a single priceList
        let p = d.getPriceListByAccount
        if (p===undefined) { p = d.getPriceListByCode }
        const result = {}
        for(let i = 0; i<p.length;i++){
            const itemCode = p[i].SKU_id.shortCode
            const rentMode = p[i].rentMode
            const duration = p[i].duration
            let pricing = {}
            pricing[itemCode] = merge({}, p[i].SKU_id)
            pricing[itemCode]['mode'] = {}
            pricing[itemCode]['mode'][rentMode] = {}
            pricing[itemCode]['mode'][rentMode][duration] = omit(p[i], ['__typename', 'SKU_id', 'code', 'rentMode', 'duration'])
            merge(result, pricing)
        }
        return result
    }

	render() {
		// const [redirectPath, setRedirectPath] = useState(undefined)

		const g = this.props.login
		const c = this.props.i18n

		return (
			<>
				<ContainerBox>
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
					{this.state.isHavePromo && (
						<PromoCodeForm c={c} g={g} />
					)}
					{!this.state.isHavePromo && (
						<>
							<HeaderWithBar color="#787F84" padding="1rem 0 0">
								{c.t("Choose Your Plan")}
								<ClickableText
									color="#E61d6e"
									float="right"
									onClick={this.toggleIsHavePromo}
								>
									{c.t("Have promo code?")}
								</ClickableText>
							</HeaderWithBar>

							<Wizard
								totalSteps={4}
								currentStep={this.state.currentStep}
							>
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
						</>
					)}
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
