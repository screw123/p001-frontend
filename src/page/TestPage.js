import React from "react"

import { Formik, Field } from "formik"
import FormikForm, { MultiSelect, FormButton, FormErr } from "../component/FormikForm.js"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import isEmpty from "lodash/isEmpty"
import pickBy from "lodash/pickBy"
import { Background } from "../component/BasicComponents.js"

import UserProfileForm from "../form/UserProfileForm.js"
import EditAddressForm from "../form/EditAddressForm.js"
import SelectAddress from "../component/SelectAddress.js"

import { ApolloProvider, Query, Mutation } from "react-apollo"

import { getMyAccount } from "../gql/query.js"

import GqlApi, { GqlApiSubscriber } from "../stateContainer/GqlApi.js"
import InfoList from "../component/InfoList.js"
import Gallery from "../component/Gallery.js"
import EditAccountForm from "../form/EditAccountForm"

import { ToolTip } from "../component/BasicComponents.js"
import SystemError from "../component/SystemError"
import RemoveCreditCardForm from "../form/RemoveCreditCardForm"

import { DateTimePicker } from "../component/DateTimePicker.js"
import moment from "moment"

import ContainerDetailsForm from "../form/ContainerDetailsForm"

class TestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const g = this.props.login
    const c = this.props.i18n

    const Container = {
      _id: "5c516ab49d02c45c7131c942",
      accountOwner_id: "5b518c4c031c7d0179e23b6a",
      autoRenew: true,
      containerType_id: "5b110d2d4e3d922dacfd3ed6",
      containerTypeName: "Standard Box",
      containerTypeShortCode: "STANDARD",
      containerUserInfo_id: [],
      finishedEvents_id: [
        {
          createDateTime: "2019-02-15T05:48:50.937Z",
          docType: "PickUpOrder",
          eventType: "SHIPTO_WAREHOUSE",
          msg:
            "Container scheduled to ship to WiseKeep, at 2019-02-16T09:00:00+08:00, from sfsdfdf sdfdsfdsf dsfsdf KOWLOON .  Attn:ssd.  Tel:54545454",
          user_id: "5b518c4b031c7d0179e23b69",
          userName: "Ross Chiu"
        },
        {
          createDateTime: "2019-02-18T09:48:58.195Z",
          doc_id: "5c6a7f8889d92c25aa2bc97d",
          docType: "DeliveryOrder",
          eventType: "SEND_EMPTY_CONTAINER",
          msg:
            "Container scheduled to ship from WiseKeep, at 2019-02-19T09:00:00+08:00, to sfsdfdf sdfdsfdsf dsfsdf KOWLOON .  Attn:ssd.  Tel:54545454"
        }
      ],
      heightM: 0.31,
      lengthM: 0.6,
      paidDuration: 5,
      paidTerms: "DAY",
      printId: "WR5F",
      rentalOrder_id: "5c516aae9d02c45c7131c939",
      status: "PENDING_INBOUND",
      storageExpiryDate: "2020-01-01T00:00:00.000Z",
      storageStartDate: "2019-01-01T00:00:00.000Z",
      upcomingEvents_id: [],
      userDefinedName: "haha my box",
      weightKG: 20,
      widthM: 0.4
    }

    return (
      <div>
        <ContainerDetailsForm i18n={c} Container={Container} />
      </div>
    )
  }
}

export default TestPage
