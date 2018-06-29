import React from "react"
import { I18n } from 'react-i18next'
import { getMyself } from '../gql/query.js'
import Background from '../component/Background.js'

import GqlApi, { GqlApiSubscriber } from '../container/GqlApi.js'
import { ApolloProvider, Query } from "react-apollo"


class DataPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loadData: false }
        this.loadData = this.loadData.bind(this)
      }
    
    loadData() {
        console.log('loadData=', this.state.loadData)
        this.setState({loadData: true})
        console.log('loadData=', this.state.loadData)
    }

    render() {
        const makePretty = (d) => {
            return(
                <div>
                    <h2>Welcome {d.firstName + ' ' + d.lastName}</h2>
                    
                    <h3>Your list of accounts:</h3>
                    <p><b>{d.accountOwn_id[0].name}</b>({d._id}) {d.accountOwn_id[0].isActive? "Active": "SUSPENDED"}<br />
                    Current Balance: {d.accountOwn_id[0].balance} <br />
                    <b>Default Billing Address</b><br />
                    {d.accountOwn_id[0].defaultBillingAddress_id.addressType}<br />
                    {d.accountOwn_id[0].defaultBillingAddress_id.legalName}<br />
                    {d.accountOwn_id[0].defaultBillingAddress_id.streepAddress}<br />
                    {d.accountOwn_id[0].defaultBillingAddress_id.addressRegion}<br />
                    {d.accountOwn_id[0].defaultBillingAddress_id.addressCountry}<br />
                    </p>
                </div>
            )
        }

        return (
            <ApolloProvider client={GqlApi.state.gqlClient}>
                <Background>
                    <Query query={getMyself}>
                    {({ client, loading, error, data, refetch }) => {
                        if (loading) return (<button onClick={() => {
                            this.loadData()
                            refetch()
                            }}>Load data after login</button>)

                        if (error) return (<p>Error :(<button onClick={() => {
                            this.loadData()
                            refetch()
                            }}>Load data after login</button></p>)

                        console.log('data=', data)
                        
                        if (data.getMyself.length==0) return (<button onClick={() => {
                            this.loadData()
                            refetch()
                            }}>Load data after login</button>)

                        return(
                            <div>
                            <button onClick={() => {
                                client.resetStore()
                                }}>Logout</button>
                                {makePretty(data.getMyself)}
                            </div>
                        )
                    }}
                    </Query>
                </Background>
            </ApolloProvider>
        )
    }
}

export default DataPage