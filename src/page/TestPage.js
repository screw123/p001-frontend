import React from "react"

import { Formik, Field } from 'formik'
import FormikForm, { MultiSelect, FormButton, FormErr } from '../component/FormikForm.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import Background from '../component/BasicComponents.js'

import UserProfileForm from '../form/UserProfileForm.js'
import EditAddressForm from "../form/EditAddressForm.js";
import SelectAddress from '../component/SelectAddress.js'

import { ApolloProvider, Query, Mutation } from "react-apollo"

import { getMyAccount} from '../gql/query.js'

import GqlApi, {GqlApiSubscriber} from '../stateContainer/GqlApi.js'
import InfoList from "../component/InfoList.js";

const data = [
    {
        "_id": "5b518c4c031c7d0179e23b6a",
        "accountType": "PERSONAL",
        "address_id": [
            "5afba4f4b2d52237e3f2fc75",
            "5afba4fbb2d52237e3f2fc76"
        ],
        "balance": 500.45,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "defaultBillingAddress_id": "5afba4f4b2d52237e3f2fc75",
        "defaultShippingAddress_id": "5afba4fbb2d52237e3f2fc76",
        "isActive": true,
        "name": "DEFAULT",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "VIP",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b8769d78b53fbb204118e8b",
        "accountType": "PERSONAL",
        "balance": 0,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "isActive": true,
        "name": "Testing",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "DEFAULT",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b518c4c031c7d0179e23b6a",
        "accountType": "PERSONAL",
        "address_id": [
            "5afba4f4b2d52237e3f2fc75",
            "5afba4fbb2d52237e3f2fc76"
        ],
        "balance": 500.45,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "defaultBillingAddress_id": "5afba4f4b2d52237e3f2fc75",
        "defaultShippingAddress_id": "5afba4fbb2d52237e3f2fc76",
        "isActive": true,
        "name": "DEFAULT",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "VIP",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b8769d78b53fbb204118e8b",
        "accountType": "PERSONAL",
        "balance": 0,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "isActive": true,
        "name": "Testing",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "DEFAULT",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b518c4c031c7d0179e23b6a",
        "accountType": "PERSONAL",
        "address_id": [
            "5afba4f4b2d52237e3f2fc75",
            "5afba4fbb2d52237e3f2fc76"
        ],
        "balance": 500.45,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "defaultBillingAddress_id": "5afba4f4b2d52237e3f2fc75",
        "defaultShippingAddress_id": "5afba4fbb2d52237e3f2fc76",
        "isActive": true,
        "name": "DEFAULT",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "VIP",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b8769d78b53fbb204118e8b",
        "accountType": "PERSONAL",
        "balance": 0,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "isActive": true,
        "name": "Testing",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "DEFAULT",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b518c4c031c7d0179e23b6a",
        "accountType": "PERSONAL",
        "address_id": [
            "5afba4f4b2d52237e3f2fc75",
            "5afba4fbb2d52237e3f2fc76"
        ],
        "balance": 500.45,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "defaultBillingAddress_id": "5afba4f4b2d52237e3f2fc75",
        "defaultShippingAddress_id": "5afba4fbb2d52237e3f2fc76",
        "isActive": true,
        "name": "DEFAULT",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "VIP",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b8769d78b53fbb204118e8b",
        "accountType": "PERSONAL",
        "balance": 0,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "isActive": true,
        "name": "Testing",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "DEFAULT",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b518c4c031c7d0179e23b6a",
        "accountType": "PERSONAL",
        "address_id": [
            "5afba4f4b2d52237e3f2fc75",
            "5afba4fbb2d52237e3f2fc76"
        ],
        "balance": 500.45,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "defaultBillingAddress_id": "5afba4f4b2d52237e3f2fc75",
        "defaultShippingAddress_id": "5afba4fbb2d52237e3f2fc76",
        "isActive": true,
        "name": "DEFAULT",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "VIP",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    },
    {
        "_id": "5b8769d78b53fbb204118e8b",
        "accountType": "PERSONAL",
        "balance": 0,
        "creationDateTime": "2018-07-20T07:16:28.117Z",
        "isActive": true,
        "name": "Testing",
        "owner_id": "5b518c4b031c7d0179e23b69",
        "priceList": "DEFAULT",
        "updateDateTime": "2018-07-20T07:16:28.117Z"
    }
];

const infoProps = {
    data: data,
    headerIconLeft: (<FontAwesomeIcon icon="plus-circle" />),
    headerIconRight: (<FontAwesomeIcon icon="eye" />),
    headerText: "Testing InfoList",
    listComponent: (a, data) => (
        <div key={a.key} style={a.style}>
            {Object.keys(data).map((v)=> <span key={a.index+v}>{v + ' : ' + data[v]}</span>)}
            <div>+++++++++++</div>
        </div>
    )
}

// For Edit AddressForm check
const demoUser = {
    "_id":"5ba0b52cec46627f7930b9ba",
    "legalName":"My Office",
    "addressCountry":"KOWLOON",
    "streetAddress":"Flat B2, 3/F, Ching Cheong Ind. Bldg., 1 Kwai Cheong Rd,",
    "addressRegion1":"So Kwun Wat",
    "addressRegion2":"屯門",
    "telephone":"99911122",
    "account_id":"5b518c4c031c7d0179e23b6a",
    "isActive":true,
    "addressType":"CUSTOMER",
    "creationDateTime":"2018-09-18T08:19:56.673Z",
    "updateDateTime":"2018-09-18T08:19:56.673Z"
}

class TestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state={address: ''}
    }

    handleAddressChange = (n, v) => this.setState({address: v})

    render() { return(
        <GqlApiSubscriber>
        {(g)=>(
            <ApolloProvider client={GqlApi.getGqlClient()}>
                <Query query={getMyAccount}>
                {({ client, loading, error, data, refetch }) => {
                    if (loading) {return (<p>loading</p>)}
                    if (error) {
                        console.log("err: ",error)
                    return (<p>Err</p>)}
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
        )}</GqlApiSubscriber>
     )}
}

export default TestPage