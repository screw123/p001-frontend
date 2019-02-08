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

import ContainerList from "../component/ContainerList"

class TestPage extends React.Component {
  render() {
    const g = this.props.login
    const c = this.props.i18n

    return <ContainerList selected={["id1", "id2", "id3"]} />
  }
}

export default TestPage
