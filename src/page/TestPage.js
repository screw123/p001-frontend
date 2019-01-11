import React from "react";

import { Formik, Field } from "formik";
import FormikForm, { MultiSelect, FormButton, FormErr } from "../component/FormikForm.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import isEmpty from "lodash/isEmpty";
import pickBy from "lodash/pickBy";
import { Background } from "../component/BasicComponents.js";

import UserProfileForm from "../form/UserProfileForm.js";
import EditAddressForm from "../form/EditAddressForm.js";
import SelectAddress from "../component/SelectAddress.js";

import { ApolloProvider, Query, Mutation } from "react-apollo";

import { getMyAccount } from "../gql/query.js";

import GqlApi, { GqlApiSubscriber } from "../stateContainer/GqlApi.js";
import InfoList from "../component/InfoList.js";
import Gallery from "../component/Gallery.js";
import EditAccountForm from "../form/EditAccountForm";

import { ToolTip } from "../component/BasicComponents.js";
import SystemError from "../component/SystemError";
import RemoveCreditCardForm from "../form/RemoveCreditCardForm";

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleAddressChange = (n, v) => this.setState({ address: v });

  // Handle funtion for RemoveCreditCardForm
  onRemoveSuccess = result => {
    console.log(result, "Removed");
  };
  cancelRemoveAction = e => {
    e.preventDefault();
    console.log("Canceled");
  };

  render() {
    let data = {
      source: {
        amount: null,
        card: {
          brand: "Visa",
          exp_month: 11,
          exp_year: 2022,
          last4: "4242"
        },
        client_secret: "src_client_secret_EGb2e2c1b17Gdnt9yD3vRvQI",
        created: 1546412959,
        currency: "usd",
        flow: "receiver",
        id: "src_1Do3qt2eZvKYlo2CxTH3gRwL",
        livemode: false,
        metadata: {},
        object: "source",
        statement_descriptor: null,
        status: "pending",
        type: "ach_credit_transfer",
        usage: "reusable"
      },
      account_id: "ahbjakl13897jdsalk7e",
      onRemoveSuccess: this.onRemoveSuccess,
      cancelRemoveAction: this.cancelRemoveAction
    };
    return (
      <div>
        <RemoveCreditCardForm {...data} />
      </div>
    );
  }
}

export default TestPage;
