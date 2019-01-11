import React from "react";
import { ApolloProvider, Mutation } from "react-apollo";

import parseApolloErr from "../util/parseErr.js";

import { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js";
import GqlApi, { GqlApiSubscriber } from "../stateContainer/GqlApi.js";
import styled from "styled-components";
import { injectStripe, Elements, StripeProvider } from "react-stripe-elements";
import {
  Container,
  Label,
  Wrapper,
  StripeCardNumberInput,
  StripeCardExpiryInput,
  StripeCardCVCInput
} from "../component/StripeComponents.js";

import { removeStripeSource } from "../gql/query.js";
import { LoadingIcon } from "../component/Loading.js";

const Msg = styled.p`
  margin: 1rem 0;
`;
const Error = styled.p`
  margin: 1rem 0;
  color: red;
`;

class StripePaymentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      stripeSourceCreateErr: ""
    };
  }

  async submit(e, mutate, t) {
    e.preventDefault();

    let { source, error } = await this.props.stripe.createSource({
      type: "card"
    });
    console.log(source, error, "removeSubmit");
    if (source) {
      try {
        const d = await mutate({
          variables: { token: source.id, account_id: this.props.account_id }
        });
        console.log(d);
        if (this.props.onSuccess) {
          this.props.onRemoveSuccess(source);
        }
      } catch (e) {
        const errStack = parseApolloErr(e, t);
        console.log(e);
        this.setState({ stripeSourceCreateErr: errStack[0].message });
      }
    }
    if (error) {
      console.log(error, "removeSubmitError");
      this.setState({ stripeSourceCreateErr: error.message });
    }
  }

  render() {
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
                      <button onClick={e => this.submit(e, mutate, c.t)} disabled={loading}>
                        {c.t("OK")}
                      </button>
                      <button onClick={e => this.props.cancelRemoveAction(e)} disabled={loading}>
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
    );
  }
}

//Populate child with this.props.stripe
const StripeForm = injectStripe(StripePaymentInfo);

class RemoveCreditCardForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_XzSSEvQVVZoHYGnUDaOMXj3d">
          <Elements fonts={[{ cssSrc: "https://fonts.googleapis.com/css?family=Source+Code+Pro" }]}>
            <StripeForm {...this.props} />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default RemoveCreditCardForm;
