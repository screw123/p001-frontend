import union from "lodash/union"
import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import styled from "styled-components"
import {
	Background,
	CTAButton,
	Header3,
	HeaderWithBar,
	Text,
	ClickableText,
	Section
} from "../component/BasicComponents.js"

import { MultiSelect } from "../component/FormikForm.js"
import PowerModal from "../component/PowerModal"
import CheckBox from "../component/SimpleCheckBox.js"
import Wizard from "../component/Wizard"
import WizardStep from "../component/WizardStep"
import ConfirmOrderForm from "../form/ConfirmOrderForm"
import OrderBoxForm from "../form/OrderBoxForm"
import { Formik, Field, FieldArray } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FieldRow } from '../component/FormikForm.js'
import { CardsTwoRow, CardTwo } from "../page/IndexPageStyles.js"

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

const PromoContainer = styled.div`
	margin: 2rem 0;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
	p {
		color: #787f84;
		font-size: 1rem;
		font-weight: bold;
		line-height: 23px;
	}
`

const PromoInput = styled.input`
	background-color: #f4f4f4;
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

const CostContainer = styled.div`
	border-top: 2px solid #e61d6e;
	border-bottom: 2px solid #e61d6e;
	padding-left: 1.5rem;
	padding-right: 1.5rem;

	div {
		align-items: center;
		display: flex;
		justify-content: space-between;
		padding: 1rem 0;
	}

	h3 {
		color: #787f84;
		margin: 0;
	}
`

const Cost = styled.h3`
	color: #e61d6e !important;
	font-size: 1.5rem;
	font-weight: bold;
`

const ControlContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const ControlButton = styled.button`
	background: none;
	border: none;
	height: 42px;

	&:focus {
		border: none;
		outline: none;
	}
`

const ControlButtonImage = styled.img`
	height: 42px !important;
	width: 42px;
`

const GridContainer = styled.div`
	padding-top: 2rem;

	@media screen and (min-width: 768px) {
		display: flex;
		justify-content: space-between;
	}

	@media screen and (min-width: 1024px) {
		margin: 0 auto;
		width: 75%;
	}
`

const GridColumn = styled.div`
	width: 100%;
	margin: ${props => (props.margin ? props.margin : "0")};
	@media screen and (min-width: 768px) {
		width: calc(50% - 0.8rem);
	}
`

const OrderCard = styled(BigIcon)`
	box-shadow: ${props =>
		props.shadow ? props.shadow : "0 0 1rem rgba(0, 0, 0, 0.5);"};
	border: ${props => (props.Border ? props.Border : "none;")};
	@media screen and (min-width: 768px) {
		margin: 0 auto;
		max-width: 359px;
	}
`

const OrderCardRow = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: ${props => (props.margin ? props.margin : "0 0 1rem")};

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
		width: 20px;
	}
`

export const WizardStep1 = ({ c, currentStep }) => (
	<WizardStep currentStep={currentStep} step={1}>
		<CardsTwoRow>
			<CardTwo>
				<BigIcon>
					<img src="images/ico-calendarDay.svg" alt="" />
					<Text align="center" fontWeight="600">
						{c.t("Daily")}
					</Text>
				</BigIcon>
			</CardTwo>

			<CardTwo>
				<BigIcon>
					<img src="images/ico-calendarMonth.svg" alt="" />
					<Text align="center" fontWeight="600">
						{c.t("Monthly")}
					</Text>
				</BigIcon>
			</CardTwo>

			<CardTwo>
				<BigIcon>
					<img src="images/ico-calendarYear.svg" alt="" />
					<Text align="center" fontWeight="600">
						{c.t("Yearly")}
					</Text>
				</BigIcon>
			</CardTwo>
		</CardsTwoRow>
	</WizardStep>
)

export const WizardStep2_original = ({ c, currentStep }) => (
	<WizardStep currentStep={currentStep} step={2}>
		<Text color="#787F84" align="center" width="100%">
			{c.t("Select a Service")}
		</Text>
		<CardsTwoRow margin="0">
			<CardBox>
				<CardBoxImage>
					<img src="images/ico-box.svg" alt="" />
					<Text color="#787F84" align="center">
						{c.t(
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium pretium tempor."
						)}
					</Text>
					<Text size="1.2rem" align="center">
						{c.t("BY BOX")}
					</Text>
				</CardBoxImage>
			</CardBox>
		</CardsTwoRow>
	</WizardStep>
)

const ProductQtyControl = props => (
	<ControlContainer>
		<ControlButton onClick={props.clickSubs}>
			<ControlButtonImage src="images/ico-subs.svg" alt="" />
		</ControlButton>
		<Text color="#E61D6E" size="2rem">
			{props.total}
		</Text>
		<ControlButton onClick={props.clickAdd}>
			<ControlButtonImage src="images/ico-add.svg" alt="" />
		</ControlButton>
	</ControlContainer>
)

export const WizardStep2 = ({ c, currentStep }) => (
	<WizardStep currentStep={currentStep} step={2}>
		<Text color="#787F84" align="center" width="100%">
			{c.t("Select a Product")}
		</Text>
		<CardsTwoRow margin="0">
			<CardBox>
				<CardBoxImage>
					<img src="images/ico-box.svg" alt="" />
					<p>Document Box</p>
					<Text color="#787F84" align="center">
						{c.t("$0 box/month")}
					</Text>
					<ClickableText
						color="#E61D6E"
						align="center"
						display="block"
					>
						{c.t("View details")}
					</ClickableText>
					<ProductQtyControl
						//total={this.state.products.documentBox}
						clickAdd={() =>
							this.addControlFnc("add", "documentBox")
						}
						clickSubs={() =>
							this.addControlFnc("subs", "documentBox")
						}
					/>
				</CardBoxImage>
			</CardBox>

			<CardBox>
				<CardBoxImage>
					<img src="images/ico-box.svg" alt="" />
					<p>Document Box</p>
					<Text color="#787F84" align="center">
						{c.t("$0 box/month")}
					</Text>
					<ClickableText
						color="#E61D6E"
						align="center"
						display="block"
					>
						{c.t("View details")}
					</ClickableText>
					<ProductQtyControl
						//total={this.state.products.documentBoxSecond}
						clickAdd={() =>
							this.addControlFnc("add", "documentBoxSecond")
						}
						clickSubs={() =>
							this.addControlFnc("subs", "documentBoxSecond")
						}
					/>
				</CardBoxImage>
			</CardBox>

			<CardBox>
				<CardBoxImage>
					<img src="images/ico-box.svg" alt="" />
					<p>Document Box</p>
					<Text color="#787F84" align="center">
						{c.t("$0 box/month")}
					</Text>
					<ClickableText
						color="#E61D6E"
						align="center"
						display="block"
					>
						{c.t("View details")}
					</ClickableText>
					<ProductQtyControl
						//total={this.state.products.documentBox3}
						clickAdd={() =>
							this.addControlFnc("add", "documentBox3")
						}
						clickSubs={() =>
							this.addControlFnc("subs", "documentBox3")
						}
					/>
				</CardBoxImage>
			</CardBox>
		</CardsTwoRow>

		<CostContainer>
			<div>
				<h3>Monthly Cost Estimate</h3>

				<Cost>$0</Cost>
			</div>
		</CostContainer>
	</WizardStep>
)

export const WizardStep3 = ({ currentStep, c }) => (
	<WizardStep currentStep={currentStep} step={3}>
		<Text color="#787F84" align="center" width="100%">
			{c.t("Select a Booking")}
		</Text>
		<GridContainer>
			<GridColumn margin="0 0 2rem">
				<OrderBoxForm c={c} />
			</GridColumn>
			<GridColumn>
				<OrderCard>
					<OrderCardRow margin="0 0 1.3rem">
						<Text color="#787F84" align="left" fontWeight="bold">
							<small>{c.t("Your Order")}</small>
						</Text>
						<EditCard>
							<Text color="#787F84" align="left">
								<small>{c.t("Edit")}</small>
							</Text>
							<img src="images/ico-edit.svg" alt="" />
						</EditCard>
					</OrderCardRow>

					<OrderCardRow>
						<Text color="#787F84" align="left" fontWeight="bold">
							<small>{c.t("1 x Document Box")}</small>
						</Text>
						<Text color="#E61D6E" align="left" fontWeight="bold">
							<small>{c.t("$0")}</small>
						</Text>
					</OrderCardRow>

					<OrderCardRow className="divider">
						<Text color="#787F84" align="left">
							<small>
								{c.t(
									"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate"
								)}
							</small>
						</Text>
					</OrderCardRow>

					<OrderCardRow>
						<Text color="#787F84" align="left">
							<small className="disclaimer">
								{c.t("Lorem Ipsum dolor sit amet, consectetur")}
							</small>
						</Text>
						<Text color="#E61D6E" align="left" fontWeight="bold">
							<small>{c.t("$0")}</small>
						</Text>
					</OrderCardRow>
				</OrderCard>
			</GridColumn>
		</GridContainer>
	</WizardStep>
)

export const WizardStep4 = ({ currentStep, c }) => (
	<WizardStep currentStep={currentStep} step={4}>
		<Text color="#787F84" align="center" width="100%">
			{c.t("Secure Payment")}

			<GridContainer>
				<GridColumn margin="0 0 2rem">
					<ConfirmOrderForm c={c} />
				</GridColumn>
				<GridColumn margin="0 0 1rem">
					<OrderCard>
						<OrderCardRow margin="0 0 1.3rem">
							<Text
								color="#787F84"
								align="left"
								fontWeight="bold"
							>
								<small>{c.t("Your Order")}</small>
							</Text>
							<EditCard>
								<Text color="#787F84" align="left">
									<small>{c.t("Edit")}</small>
								</Text>
								<img src="images/ico-edit.svg" alt="" />
							</EditCard>
						</OrderCardRow>

						<OrderCardRow>
							<Text
								color="#787F84"
								align="left"
								fontWeight="bold"
							>
								<small>{c.t("1 x Document Box")}</small>
							</Text>
							<Text
								color="#E61D6E"
								align="left"
								fontWeight="bold"
							>
								<small>{c.t("$0")}</small>
							</Text>
						</OrderCardRow>

						<OrderCardRow className="divider">
							<Text color="#787F84" align="left">
								<small>
									{c.t(
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate"
									)}
								</small>
							</Text>
						</OrderCardRow>

						<OrderCardRow>
							<Text color="#787F84" align="left">
								<small className="disclaimer">
									{c.t(
										"Lorem Ipsum dolor sit amet, consectetur"
									)}
								</small>
							</Text>
							<Text
								color="#E61D6E"
								align="left"
								fontWeight="bold"
							>
								<small>{c.t("$0")}</small>
							</Text>
						</OrderCardRow>
					</OrderCard>
				</GridColumn>
			</GridContainer>

			<GridContainer>
				<GridColumn margin="0 1%">
					<OrderCard Border="1px solid #DFDFDF" shadow="none">
						<OrderCardRow margin="0 0 1.3rem" className="divider">
							<Text
								color="#787F84"
								align="left"
								fontWeight="bold"
							>
								<small>{c.t("Appointment Address")}</small>
							</Text>
							<EditCard>
								<Text color="#787F84" align="left">
									<small>{c.t("Edit")}</small>
								</Text>
								<img src="images/ico-edit.svg" alt="" />
							</EditCard>
						</OrderCardRow>
						<OrderCardRow margin="0">
							<Text color="#787F84" align="left">
								<small>
									{c.t(
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vulputate"
									)}
								</small>
							</Text>
						</OrderCardRow>
						<OrderCardRow margin="0">
							<Text fontWeight="600" color="#787F84" align="left">
								<small>
									{c.t("Big Wave Bay, Hong Kong Island")}
								</small>
							</Text>
						</OrderCardRow>
						<OrderCardRow margin="0">
							<Text size="0.8rem" color="#787F84" align="left">
								{c.t("Big Wave Bay, Hong Kong Island")}
							</Text>
						</OrderCardRow>
					</OrderCard>
				</GridColumn>
				<GridColumn margin="0 1%">
					<OrderCard Border="1px solid #DFDFDF" shadow="none">
						<OrderCardRow margin="0 0 1.3rem" className="divider">
							<Text
								color="#787F84"
								align="left"
								fontWeight="bold"
							>
								<small>{c.t("Drop-off of boxes")}</small>
							</Text>
							<EditCard>
								<Text color="#787F84" align="left">
									<small>{c.t("Edit")}</small>
								</Text>
								<img src="images/ico-edit.svg" alt="" />
							</EditCard>
						</OrderCardRow>
						<OrderCardRow>
							<Text color="#787F84" align="left">
								<small>
									{c.t("Friday, 8 March, 2019 18 00 - 21 00")}
								</small>
							</Text>
						</OrderCardRow>
					</OrderCard>
				</GridColumn>
				<GridColumn margin="0 1%">
					<OrderCard Border="1px solid #DFDFDF" shadow="none">
						<OrderCardRow margin="0 0 1.3rem" className="divider">
							<Text
								color="#787F84"
								align="left"
								fontWeight="bold"
							>
								<small>{c.t("Pick-up for storage")}</small>
							</Text>
							<EditCard>
								<Text color="#787F84" align="left">
									<small>{c.t("Edit")}</small>
								</Text>
								<img src="images/ico-edit.svg" alt="" />
							</EditCard>
						</OrderCardRow>
						<OrderCardRow>
							<Text color="#787F84" align="left">
								<small>
									{c.t("Friday, 8 March, 2019 18 00 - 21 00")}
								</small>
							</Text>
						</OrderCardRow>
					</OrderCard>
				</GridColumn>
			</GridContainer>
		</Text>
		<CheckBox
			name="termsAndConditions"
			//onChange={this.handleChange}
			//isChecked={this.state.isChecked}
			label="I agree with terms and conditions"
		/>
	</WizardStep>
)

export const PromoCodeForm = ({c, promoCode, ...props }) => (
	<Section display="block">
		<Formik
				initialValues={{
					promoCode: promoCode
				}}
				validate={values => {
					const keyArr = Object.keys(validateForm)
					let err = {}
					for (let i = 0; i < keyArr.length; i++) {
						const f = keyArr[i]
						const e = validateForm[f](values)
						if (e !== undefined) {
							err[f] = e
						}
					}
					return err
				}}
				onSubmit={async (values, actions) => {
					actions.setStatus('')
					const isLoginSuccess = await g.login({
						user: values.user,
						password: values.password
					})
					if (isLoginSuccess === true) {
						if (this.props.onLoginSuccess) {
							this.props.onLoginSuccess()
						}
					} else {
						switch (isLoginSuccess) {
							case 401:
								actions.setFieldError(
									'password',
									c.t(
										'Email/Phone or password error.  Please check and try again.'
									)
								)
								break
							case 500:
							default:
								actions.setStatus(
									c.t(
										'System is currently busy, please wait for 1 minute and try again'
									)
								)
								break
						}
						actions.setSubmitting(false)
					}
				}}
			>
				{({ errors, isSubmitting, dirty, touched, values, status, initialValues }) => (
					<FormikForm>
						<Field
							name='user'
							type='text'
							component={TextField}
							placeholder={c.t('Email/Phone')}
							value={values.user}
							hidden={initialValues['user'] != ''}
						/>
						<Field
							name='password'
							type='password'
							component={TextField}
							placeholder={c.t('Password')}
							value={values.password}
						/>
						<FormErr>{status}</FormErr>
						{!this.state.showResetPassword && (
							<ButtonsWrapper mobile={false}>
								<FormButtonBasic onClick={this.showResetPasswordForm}>
									{c.t('Forget Your Password?')}
								</FormButtonBasic>
							</ButtonsWrapper>
						)}
						<FieldRow>
							<CTAButton
								type='submit'
								disabled={isSubmitting || !isEmpty(pickBy(errors)) || !dirty}
							>
								{c.t('Login')}
							</CTAButton>
						</FieldRow>
						{!this.state.showResetPassword && (
							<ButtonsWrapper mobile={true}>
								<FormButtonBasic onClick={this.goToSignUpPage}>
									{c.t('Sign Up')}
								</FormButtonBasic>
								<FormButtonBasic onClick={this.showResetPasswordForm}>
									{c.t('Forget Your Password?')}
								</FormButtonBasic>
							</ButtonsWrapper>
						)}
					</FormikForm>
				)}
			</Formik>
		<Text color="#787f84">{c.t("Please enter the promo code")}</Text>
		<TextField
			field={{
				placeholder: c.t("Promo Code"),
				//value: {this.state.form.promoCode}
				name: "promoCode",
				onChange: e => this.handleInputChange(e)
			}}
		/>
		<NextButton>
			<CTAButton
				width={"auto"}
				onClick={() => {
					this.toggleIsHavePromo
				}}
			>
				{c.t("Submit")}
			</CTAButton>
		</NextButton>
	</Section>
)

const validateForm = {
	promoCode: ({ promoCode }) => (promoCode.length > 3 ? undefined : 'Please enter valid')
}