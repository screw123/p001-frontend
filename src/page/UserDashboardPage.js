import React from "react"
import { getMyself } from '../gql/query.js'
import Background from '../component/Background.js'

import GqlApi from '../stateContainer/GqlApi.js'
import { ApolloProvider, Query } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'
import AddNewAddressForm from '../form/AddNewAddressForm'

class UserDashboardPage extends React.Component {
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
                    </p>
                </div>
            )
        }

        return (
            <ApolloProvider client={GqlApi.getGqlClient()}>
                <Background>
                    <Query query={getMyself}>
                    {({ client, loading, error, data, refetch }) => {
                        if (loading) return (<BigLoadingScreen/>)
                        if (error) {
                            console.log(error)
                            return (<p>Error :(</p>)
                        }
                        
                        if (data.getMyself.length==0) return (<button onClick={() => {
                            refetch()
                            }}>Load data after login</button>)

                        return(
                            <div>
                               
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

export default UserDashboardPage