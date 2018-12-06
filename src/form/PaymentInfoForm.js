import React from "react"

import { ApolloProvider,Mutation } from "react-apollo"

import parseApolloErr from '../util/parseErr.js'
import {BigLoadingScreen} from '../component/Loading.js'

import { injectStripe, Elements, StripeProvider} from 'react-stripe-elements';

import {StripeCardNumberInput, StripeCardExpiryInput, StripeCardCVCInput} from '../component/StripeComponents.js'

import {addStripeCustomer} from '../gql/query.js'
import { t } from "i18next/dist/commonjs";

class StripePaymentInfo extends React.Component {
	
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
		this.state = {
			stripeSourceCreateErr: undefined
		}
	}

	async submit(e, mutate, t) {
		e.preventDefault();

		let {source, error} = await this.props.stripe.createSource({
			type: 'card'
		})
		console.log(source, error)
		if (source) {
			try {
				const d = await mutate({variables: {token: source.id, account_id: this.props.account_id } })
				console.log(d)
				if (this.props.onSuccess) { this.props.onSuccess(source)}
			}
			catch(e) {
				const errStack = parseApolloErr(e, t)
				console.log(e)
				this.setState({stripeSourceCreateErr: errStack[0].message})
			}
		}
		if (error) {
			console.log(error)
			this.setState({stripeSourceCreateErr: error.message})
		}
	}


	render() {
		const g = this.props.login
		const c = this.props.i18n

		return (
			<ApolloProvider client={g.getGqlClient()}>
                <Mutation mutation={addStripeCustomer} errorPolicy="all">
                {(mutate, {loading, err})=>(<div>
					<StripeCardNumberInput />
					<StripeCardExpiryInput />
					<StripeCardCVCInput />
					<p>{c.t(this.state.stripeSourceCreateErr)}</p>
					<button onClick={(e)=>this.submit(e, mutate, c.t)}>Send</button>
				</div>)}
				</Mutation>
			</ApolloProvider>
		)
	}

}

//Populate child with this.props.stripe
const StripeForm = injectStripe(StripePaymentInfo)

class PaymentInfoForm extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render() {


		return (
			<div>
				<p>Would you like to complete the purchase?</p>
				<StripeProvider apiKey="pk_test_XzSSEvQVVZoHYGnUDaOMXj3d">
					<Elements fonts={[{cssSrc:'https://fonts.googleapis.com/css?family=Source+Code+Pro'}]}>
						<StripeForm {...this.props} />
					</Elements>
				</StripeProvider>
				
			</div>
		)
	}
}

export default PaymentInfoForm