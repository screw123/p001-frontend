import React from "react"
import { getMyself } from '../gql/query.js'
import Background from '../component/Background.js'

import { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import { LocaleApiSubscriber } from '../stateContainer/LocaleApi.js'
import { ApolloProvider, Query } from "react-apollo"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BigLoadingScreen} from '../component/Loading.js'


class UserDashboardPage extends React.PureComponent {

    render() { return (
        <GqlApiSubscriber>
        {(g)=>(
            <LocaleApiSubscriber>
            {(c)=>(
                <div>
                    <div>
                        {c.t('Hello, user!', {name: g.state.myself.firstName + ' ' + g.state.myself.lastName}) }
                    </div>

                    <ApolloProvider client={g.getGqlClient()}><Query query={getMyself}>
                    {({ loading, error, data }) => (
                        <div>1</div>
                    )}</Query></ApolloProvider>
                </div>
            )}</LocaleApiSubscriber>
        )}</GqlApiSubscriber>
    )}
}

export default UserDashboardPage

/*
const makePretty = (d) => {
            return(
                <div>
                    <h2>Welcome {d.firstName + ' ' + d.lastName}</h2>
                    
                    <h3>Your list of accounts:</h3>
                    <p><b>{d.accountOwn_id[0].name}</b>({d._id}) {d.accountOwn_id[0].isActive? "Active": "SUSPENDED"}<br />
                    Current Balance: {d.accountOwn_id[0].balance} <br />
                    </p>
                </div>
            )
        }*/