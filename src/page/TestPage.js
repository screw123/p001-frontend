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

import { getMyAccount} from '../gql/query.js'

import GqlApi, {GqlApiSubscriber} from '../stateContainer/GqlApi.js'
import InfoList from "../component/InfoList.js";
import Gallery from "../component/Gallery.js";

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

export default TestPage;
