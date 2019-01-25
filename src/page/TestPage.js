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

import {DateTimePicker} from '../component/DateTimePicker.js'
import moment from 'moment'

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDate: moment() }
    this.updateDate = this.updateDate.bind(this)
  }

  updateDate = (e, d) => {
    e.preventDefault()
    this.setState({selectedDate: d})
  }
  
  render() {
    const g = this.props.login
    const c = this.props.i18n

    return (
      <div>
        <DateTimePicker
          dayOnClick={this.updateDate}
          i18n={c}
          disable={d=>d.isBefore(moment())}
          customFormat={[
            {
              //coloring Sunday
              checker: (c,r,d)=>d.day()===0,
              style: 'color: Red;',
              stop: false
            },
            {
              //coloring past days
              checker: (c,r,d)=>d.isBefore(moment()),
              style: 'color: Grey;font-style: italic;',
              stop: false
            },
            {
              //test bold every 10 days
              checker: (c,r,d)=>d.month()%2===1,
              style: 'background: LightGrey;',
              stop: false
            },
          ]}
        />
        <p>{this.state.selectedDate.format('YYYY-MM-DD')}</p>
      </div>
    );
  }
}

export default TestPage;
