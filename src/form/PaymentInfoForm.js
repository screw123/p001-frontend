import React from "react"

import { Formik, Field } from 'formik'
import FormikForm, { FormButton, FormErr } from '../component/FormikForm.js'

import { ApolloProvider, Query, Mutation } from "react-apollo"

import parseApolloErr from '../util/parseErr.js'
import { BigLoadingScreen } from '../component/Loading.js'

import { injectStripe, Elements, StripeProvider } from 'react-stripe-elements';

import { Container, Label, Wrapper, StripeCardNumberInput, StripeCardExpiryInput, StripeCardCVCInput } from '../component/StripeComponents.js'



class StripePaymentInfo extends React.Component {

	constructor(props) {
		super(props) //Fixme props should pass whole account object instead of just account_id
		this.submit = this.submit.bind(this);
	}

	async submit(ev) {
		ev.preventDefault();

		this.props.stripe.createToken({ name: 'Jenny Rosen' }).then(({ token }) => {
			console.log('Received Stripe token:', token)
		})
	}

	render() {
		return (<div>
			<Container>
				<Label>Card Number</Label>
				<Wrapper>
					<StripeCardNumberInput />
				</Wrapper>
			</Container>
			<Container>
				<Label>Expires</Label>
				<Wrapper>
					<StripeCardExpiryInput />
				</Wrapper>
			</Container>
			<Container>
				<Label>Card Code</Label>
				<Wrapper>
					<StripeCardCVCInput />
				</Wrapper>
			</Container>
		</div>)
	}

}

//Populate child with this.props.stripe
const StripeForm = injectStripe(StripePaymentInfo)

class PaymentInfoForm extends React.Component {

	constructor(props) {
		super(props) //Fixme props should pass whole account object instead of just account_id
	}

	render() {
		return (
			<div>
				<p>Would you like to complete the purchase?</p>
				<StripeProvider apiKey="pk_test_XzSSEvQVVZoHYGnUDaOMXj3d">
					<Elements>
						<StripeForm />
					</Elements>
				</StripeProvider>
				<button onClick={this.submit}>Send</button>
			</div>
		)
	}

}

export default PaymentInfoForm