import React from "react"
import { ApolloProvider,Mutation } from "react-apollo"
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

import {removeStripeSource} from '../gql/query.js'

class RemoveCreditCardForm extends React.Component {
	/*
		provided props:
		

	*/



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