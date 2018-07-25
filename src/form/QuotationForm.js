import React from "react"
import { getSKU } from '../gql/query.js'
import Background from '../component/Background.js'

import GqlApi from '../container/GqlApi.js'
import { ApolloProvider, Query } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'


class DataPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loadData: false }
        this.loadData = this.loadData.bind(this)
      }
    

    render() {

        return (
            <ApolloProvider client={GqlApi.getGqlClient()}>
                <Background>
                    <Query query={getSKU}>
                    {({ loading, error, data }) => {
                        if (loading) return <BigLoadingScreen />
                        if (error) return  <div>Error :(</div>
                        
                    }}
                    </Query>
                </Background>
            </ApolloProvider>
        )
    }
}

export default DataPage