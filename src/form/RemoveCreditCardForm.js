import React from "react";
import { ApolloProvider, Mutation } from "react-apollo";

import parseApolloErr from "../util/parseErr.js";

import { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js";
import GqlApi, { GqlApiSubscriber } from "../stateContainer/GqlApi.js";
import styled from "styled-components";

import { removeStripeSource } from "../gql/query.js";
import { LoadingIcon } from "../component/Loading.js";

const Msg = styled.p`
	margin: 1rem 0;
`;
const Error = styled.p`
	margin: 1rem 0;
	color: red;
`;

class RemoveCreditCardForm extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
		this.state = {
			stripeSourceCreateErr: ""
		};
	}

	async submit(e, mutate, err, t) {
		e.preventDefault();

		if (this.props.source) {
			try {
				const d = await mutate({
					variables: { token: this.props.source.id, account_id: this.props.account_id }
				});
				console.log(d);
				if (this.props.onRemoveSuccess) {
					this.props.onRemoveSuccess(e)
				}
			} catch (e) {
				const errStack = parseApolloErr(e, t)
				console.log(e);
				this.setState({ stripeSourceCreateErr: errStack[0].message })
			}
		}
		if (err) {
			console.log(err, "removeSubmitError")
			this.setState({ stripeSourceCreateErr: err.message })
		}
	}

	render() {
        if (!this.props.source) { return null}
		return (
			<GqlApiSubscriber>
            {g => (
                <LocaleApiSubscriber>
                {c => (
                    <ApolloProvider client={g.getGqlClient()}>
                        <Mutation mutation={removeStripeSource} errorPolicy="all">
                        {(mutate, { loading, err }) => (
                            <div>
                                <Msg>
                                    {c.t(
                                        "Confirm  remove card from " +
                                            this.props.source.card.brand +
                                            ", card number " +
                                            this.props.source.card.last4 +
                                            "?"
                                    )}
                                </Msg>
                                <Error>{c.t(this.state.stripeSourceCreateErr)}</Error>
                                <button onClick={e => this.submit(e, mutate, err, c.t)} disabled={loading}>
                                    {c.t("OK")}
                                </button>
                                <button onClick={e => this.props.closeModal(e)} disabled={loading}>
                                    {c.t("Cancel")}
                                </button>
                                {loading && <LoadingIcon size={2} />}
                            </div>
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

export default RemoveCreditCardForm;
