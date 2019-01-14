import React from "react"
import { ApolloProvider,Mutation } from "react-apollo"

import parseApolloErr from '../util/parseErr.js'
import {FormErr} from '../component/Formik-Basic.js'

import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'
import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js'

import { injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import {Container, Label, Wrapper, StripeCardNumberInput, StripeCardExpiryInput, StripeCardCVCInput} from '../component/StripeComponents.js'

import {addStripeSource} from '../gql/query.js'
import {LoadingIcon} from '../component/Loading.js'

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

		//create source using client side stripe library
		let {source, error} = await this.props.stripe.createSource({
			type: 'card'
		})
		console.log('StripePaymentInfo.submit', source, error)
		//if can create source, send to backend to add to customer obj
		if (source) {
			try {
				const d = await mutate({variables: {token: source.id, account_id: this.props.account_id } })
				console.log(d)
				if (this.props.onSuccess) { this.props.onSuccess(e)}
			}
			catch(e) {
				const errStack = parseApolloErr(e, t)
				console.log(e)
				this.setState({stripeSourceCreateErr: errStack[0].message})
			}
		}
		//if not even able to create source at client side, directly display error
		if (error) {
			console.log(error)
			this.setState({stripeSourceCreateErr: error.message})
		}
	}


	render() {
		return (
			<GqlApiSubscriber>
			{g => (
				<LocaleApiSubscriber>
				{c=>(
					<ApolloProvider client={g.getGqlClient()}>
						<Mutation mutation={addStripeSource} errorPolicy="all">
						{(mutate, {loading, err})=>(<div>
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
							<FormErr>{c.t(this.state.stripeSourceCreateErr)}</FormErr>
							<button onClick={(e)=>this.submit(e, mutate, c.t)} disabled={loading}>{c.t('Submit')}</button>
							<button onClick={e=>this.props.onCancel(e)} disabled={loading}>{c.t('Cancel')}</button>
							{loading && <LoadingIcon size={2} />}
						</div>)}
						</Mutation>
					</ApolloProvider>
				)}
				</LocaleApiSubscriber>
			)}
			</GqlApiSubscriber>
		)
	}

}

//Populate child with this.props.stripe
const StripeForm = injectStripe(StripePaymentInfo)

class AddCreditCardForm extends React.Component {
	
	constructor(props) {
		super(props)
	}

	render() {


		return (
			<div>
				<p>Please provide your credit card info:</p>
				<StripeProvider apiKey="pk_test_XzSSEvQVVZoHYGnUDaOMXj3d">
					<Elements fonts={[{cssSrc:'https://fonts.googleapis.com/css?family=Source+Code+Pro'}]}>
						<StripeForm {...this.props} />
					</Elements>
				</StripeProvider>
			</div>
		)
	}
}

export default AddCreditCardForm