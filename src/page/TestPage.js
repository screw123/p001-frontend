import React from "react";

import { Formik, Field } from "formik";
import FormikForm, {
    MultiSelect,
    FormButton,
    FormErr
} from "../component/FormikForm.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import Background from '../component/BasicComponents.js'

import UserProfileForm from '../form/UserProfileForm.js'
import EditAddressForm from "../form/EditAddressForm.js";
import SelectAddress from '../component/SelectAddress.js'

import { ApolloProvider, Query, Mutation } from "react-apollo"

import { getMyAccount } from '../gql/query.js'

import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import InfoList from "../component/InfoList.js";
import Gallery from "../component/Gallery.js";
import EditAccountForm from "../form/EditAccountForm"

const data = [
    {
        _id: 1,
        name: "Nemo 1",
        URL: "http://lorempicsum.com/nemo/500/500/1",
        URL_thumbnail: "http://lorempicsum.com/nemo/200/200/1"
    },
    {
        _id: 2,
        name: "Nemo 2",
        URL: "http://lorempicsum.com/nemo/500/500/2",
        URL_thumbnail: "http://lorempicsum.com/nemo/200/200/2"
    },
    {
        _id: 3,
        name: "Nemo 3",
        URL: "http://lorempicsum.com/nemo/500/500/3",
        URL_thumbnail: "http://lorempicsum.com/nemo/200/200/3"
    },
    {
        _id: 4,
        name: "Nemo 4",
        URL: "http://lorempicsum.com/nemo/500/500/4",
        URL_thumbnail: "http://lorempicsum.com/nemo/200/200/4"
    },
    {
        _id: 5,
        name: "Nemo 5",
        URL: "http://lorempicsum.com/nemo/500/500/5",
        URL_thumbnail: "http://lorempicsum.com/nemo/200/200/5"
    },
    {
        _id: 6,
        name: "Nemo 6",
        URL: "http://lorempicsum.com/nemo/500/500/6",
        URL_thumbnail: "http://lorempicsum.com/nemo/200/200/6"
    },
    {
        _id: 7,
        name: "Nemo 7",
        URL: "http://lorempicsum.com/nemo/500/500/7",
        URL_thumbnail: "http://lorempicsum.com/nemo/200/200/7"
    },
    {
        _id: 8,
        name: "Nemo 8",
        URL: "http://lorempicsum.com/nemo/500/500/8",
        URL_thumbnail: "http://lorempicsum.com/nemo/200/200/8"
    }
    // {
    //     _id: 9,
    //     name: "Nemo 9",
    //     URL: "http://lorempicsum.com/nemo/500/500/9",
    //     URL_thumbnail: "http://lorempicsum.com/nemo/200/200/9"
    // }
];

const props = {
    headerText: "Header",
    headerIconLeft: "Header Left",
    headerIconRight: "Header Right",
    data: data,
    imageSize: 200,

    selectMode: true,
    onSelect: {},
    selectedValue: [],
    icons: ""
};

// For Edit AddressForm check
const account = {
    "_id": "5b518c4c031c7d0179e23b6a",
    "accountType": "PERSONAL",
    "address_id": [
        {
            "_id": "5c016b1837b0254610f40125",
            "account_id": "5b518c4c031c7d0179e23b6a",
            "addressCountry": "HONG KONG ISLAND",
            "addressRegion1": "sdfdsfdsf",
            "addressRegion2": "dsfsdf",
            "addressType": "CUSTOMER",
            "creationDateTime": "2018-11-30T16:53:44.240Z",
            "isActive": true,
            "legalName": "ssd",
            "streetAddress": "sfsdfdf",
            "telephone": "54545454",
            "updateDateTime": "2018-11-30T16:53:44.240Z"
        },
        {
            "_id": "5c07a1b08660035032b66e8e",
            "account_id": "5b518c4c031c7d0179e23b6a",
            "addressCountry": "NEW TERRITORIES",
            "addressRegion1": "ddd",
            "addressRegion2": "ddd",
            "addressType": "CUSTOMER",
            "creationDateTime": "2018-12-05T10:00:16.761Z",
            "isActive": true,
            "legalName": "ddd",
            "streetAddress": "ddddd",
            "telephone": "50505050",
            "updateDateTime": "2018-12-05T10:00:16.761Z"
        },
        {
            "_id": "5c0d0136b10b307cbc2bbc00",
            "account_id": "5c0d0110b10b307cbc2bbbfd",
            "addressCountry": "LANTAU",
            "addressRegion1": " kk kkkk",
            "addressRegion2": "oommomo",
            "addressType": "CUSTOMER",
            "creationDateTime": "2018-12-09T11:49:10.270Z",
            "isActive": true,
            "legalName": "e k kk",
            "streetAddress": "k k k k ",
            "telephone": "61616161",
            "updateDateTime": "2018-12-09T11:49:10.270Z"
        }
    ],
    "balance": 0,
    "creationDateTime": "2018-07-20T07:16:28.117Z",
    "defaultBillingAddress_id": {
        "_id": "5c016b1837b0254610f40125",
        "account_id": "5b518c4c031c7d0179e23b6a",
        "addressCountry": "HONG KONG ISLAND",
        "addressRegion1": "sdfdsfdsf",
        "addressRegion2": "dsfsdf",
        "addressType": "CUSTOMER",
        "creationDateTime": "2018-11-30T16:53:44.240Z",
        "isActive": true,
        "legalName": "ssd",
        "streetAddress": "sfsdfdf",
        "telephone": "54545454",
        "updateDateTime": "2018-11-30T16:53:44.240Z"
    },
    "defaultShippingAddress_id": {
        "_id": "5c016b1837b0254610f40125",
        "account_id": "5b518c4c031c7d0179e23b6a",
        "addressCountry": "HONG KONG ISLAND",
        "addressRegion1": "sdfdsfdsf",
        "addressRegion2": "dsfsdf",
        "addressType": "CUSTOMER",
        "creationDateTime": "2018-11-30T16:53:44.240Z",
        "isActive": true,
        "legalName": "ssd",
        "streetAddress": "sfsdfdf",
        "telephone": "54545454",
        "updateDateTime": "2018-11-30T16:53:44.240Z"
    },
    "isActive": true,
    "name": "DEFAULT",
    "owner_id": "5b518c4b031c7d0179e23b69",
    "paymentTerm": "COD",
    "priceList": "VIP",
    "stripeCustomerObject": {
        "default_source": "src_1Deh6gDHUPkMBbUNxYOyjjMk",
        "id": "cus_E6uwVCSDYE8ruK",
        "sources": {
            "data": [
                {
                    "amount": null,
                    "card": {
                        "address_line1_check": null,
                        "address_zip_check": null,
                        "brand": "Visa",
                        "country": "US",
                        "cvc_check": "pass",
                        "dynamic_last4": null,
                        "exp_month": 11,
                        "exp_year": 2022,
                        "fingerprint": "tUgDuFPsRVyGq2ON",
                        "funding": "credit",
                        "last4": "4242",
                        "name": null,
                        "three_d_secure": "optional",
                        "tokenization_method": null
                    },
                    "client_secret": "src_client_secret_E6uwFsUepUi6PYiVNMhUiNMB",
                    "created": 1544180574,
                    "currency": null,
                    "customer": "cus_E6uwVCSDYE8ruK",
                    "flow": "none",
                    "id": "src_1Deh6gDHUPkMBbUNxYOyjjMk",
                    "livemode": false,
                    "metadata": {},
                    "object": "source",
                    "owner": {
                        "address": null,
                        "email": null,
                        "name": null,
                        "phone": null,
                        "verified_address": null,
                        "verified_email": null,
                        "verified_name": null,
                        "verified_phone": null
                    },
                    "statement_descriptor": null,
                    "status": "chargeable",
                    "type": "card",
                    "usage": "reusable"
                },
                {
                    "amount": null,
                    "card": {
                        "address_line1_check": null,
                        "address_zip_check": null,
                        "brand": "Visa",
                        "country": "US",
                        "cvc_check": "pass",
                        "dynamic_last4": null,
                        "exp_month": 11,
                        "exp_year": 2022,
                        "fingerprint": "tUgDuFPsRVyGq2ON",
                        "funding": "credit",
                        "last4": "4242",
                        "name": null,
                        "three_d_secure": "optional",
                        "tokenization_method": null
                    },
                    "client_secret": "src_client_secret_E7vl9WI1JmTHTxRlN3UFalVL",
                    "created": 1544414255,
                    "currency": null,
                    "customer": "cus_E6uwVCSDYE8ruK",
                    "flow": "none",
                    "id": "src_1DfftjDHUPkMBbUNmudItQxZ",
                    "livemode": false,
                    "metadata": {},
                    "object": "source",
                    "owner": {
                        "address": null,
                        "email": null,
                        "name": null,
                        "phone": null,
                        "verified_address": null,
                        "verified_email": null,
                        "verified_name": null,
                        "verified_phone": null
                    },
                    "statement_descriptor": null,
                    "status": "chargeable",
                    "type": "card",
                    "usage": "reusable"
                }
            ],
            "total_count": 2
        }
    },
    "updateDateTime": "2018-07-20T07:16:28.117Z"
}

class TestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { address: '' }
    }

    handleAddressChange = (n, v) => this.setState({ address: v })

    render() {
        const g = this.props.login
        const c = this.props.i18n
        return(
            <ApolloProvider client={GqlApi.getGqlClient()}>
                <Query query={getMyAccount}>
                {({ client, loading, error, data, refetch }) => {
                    if (loading) {return (<p>loading</p>)}
                    if (error) {
                        console.log("err: ",error)
                        return (<p>Err</p>)
                    }
                    console.log('data=',data)
                    return (
                        <div>
                            <SelectAddress
                                allowAddAddress={false}
                                account_id={"5b518c4c031c7d0179e23b6a"}
                                addresses={data.getMyAccount[0].address_id}
                                field={{name: 'selectaddress', value: this.state.address}}
                                form={{setFieldValue: this.handleAddressChange}}
                            />
                            <EditAddressForm
                                account_id={"5b518c4c031c7d0179e23b6a"}
                                address={data.getMyAccount[0].address_id.find((v)=>v._id===this.state.address) || {}}
                                onSubmitSuccess={refetch}
                            />
                        </div>
                    )
                }}</Query>
            </ApolloProvider>
        )
    }
}

export default TestPage;
