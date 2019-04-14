import React from 'react'
import { ApolloProvider, Mutation } from 'react-apollo'

import parseApolloErr from '../util/parseErr.js'
import { FormErr } from '../component/Formik-Basic.js'

import { LocaleApiSubscriber } from '../stateContainer/LocaleApi.js'
import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js'

import { injectStripe, Elements, StripeProvider } from 'react-stripe-elements'
import {
	MainContainer,
	FieldContainer,
	Container,
	Title,
	Header,
	CrossIcon,
	SubmitWrapper,
	Wrapper,
	StripeCardNumberInput,
	StripeCardExpiryInput,
	StripeCardCVCInput
} from '../component/StripeComponents.js'

import { addStripeSource } from '../gql/query.js'
import { LoadingIcon } from '../component/Loading.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CTAButton } from '../component/BasicComponents.js'

class StripePaymentInfo extends React.Component {
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
		this.state = {
			stripeSourceCreateErr: undefined
		}
	}

	async submit(e, mutate, t) {
		e.preventDefault()

		//create source using client side stripe library
		let { source, error } = await this.props.stripe.createSource({
			type: 'card'
		})
		console.log('StripePaymentInfo.submit', source, error)
		//if can create source, send to backend to add to customer obj
		if (source) {
			try {
				const d = await mutate({
					variables: { token: source.id, account_id: this.props.account_id }
				})
				console.log(d)
				if (this.props.onSuccess) {
					this.props.onSuccess(e)
				}
			} catch (e) {
				const errStack = parseApolloErr(e, t)
				console.log(e)
				this.setState({ stripeSourceCreateErr: errStack[0].message })
			}
		}
		//if not even able to create source at client side, directly display error
		if (error) {
			console.log(error)
			this.setState({ stripeSourceCreateErr: error.message })
		}
	}

	render() {
		return (
			<GqlApiSubscriber>
				{g => (
					<LocaleApiSubscriber>
						{c => (
							<ApolloProvider client={g.getGqlClient()}>
								<Mutation mutation={addStripeSource} errorPolicy='all'>
									{(mutate, { loading, err }) => (
										<FieldContainer>
											<Container>
												<Wrapper>
													<StripeCardNumberInput placeholder='Card Number' />
												</Wrapper>
											</Container>
											<Container>
												<Wrapper>
													<StripeCardExpiryInput placeholder='Expiration' />
												</Wrapper>
											</Container>
											<Container>
												<Wrapper>
													<StripeCardCVCInput placeholder='CVC' />
												</Wrapper>
											</Container>
											<FormErr>
												{c.t(this.state.stripeSourceCreateErr)}
											</FormErr>
											<SubmitWrapper>
												<CTAButton
													onClick={e => this.submit(e, mutate, c.t)}
													disabled={loading}
												>
													{c.t('Add Card')}
												</CTAButton>
											</SubmitWrapper>
											{/* <button
												onClick={e => this.props.onCancel(e)}
												disabled={loading}
											>
												{c.t('Cancel')}
											</button> */}
											{loading && <LoadingIcon size={2} />}
										</FieldContainer>
									)}
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
			<MainContainer>
				<Header>
					<Title>Add Credit Card</Title>
					<CrossIcon onClick={e => this.props.onCancel(e)}>
						<FontAwesomeIcon icon='times' />
					</CrossIcon>
				</Header>

				<StripeProvider apiKey='pk_test_XzSSEvQVVZoHYGnUDaOMXj3d'>
					<Elements
						fonts={[
							{ cssSrc: 'https://fonts.googleapis.com/css?family=Source+Code+Pro' }
						]}
					>
						<StripeForm {...this.props} />
					</Elements>
				</StripeProvider>
			</MainContainer>
		)
	}
}

export default AddCreditCardForm
