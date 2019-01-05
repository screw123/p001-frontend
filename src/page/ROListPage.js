import React from "react"

import ROListForm from '../form/ROListForm.js'

import {Background} from '../component/BasicComponents.js'

import { ApolloProvider, Query } from 'react-apollo'
import { getRecentROListByUser } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'

import {BigLoadingScreen} from '../component/Loading.js'

class ROListPage extends React.Component {
    
    render() {
        const g = this.props.login
        const c = this.props.i18n
        
        return (
            <ApolloProvider client={g.getGqlClient()}>
                <Query query={getRecentROListByUser} notifyOnNetworkStatusChange>
                {({ loading, error, data, refetch, networkStatus }) => {
					if (loading) return (<BigLoadingScreen text={'Loading...'}/>)
					if (error) {
						console.log('ROListPage', error)
						const errStack = parseApolloErr(error, c.t)

						return (
							<div>
								{errStack.map(v=>{ return <p>{v.message}</p> }) }
							</div>	
						)
                    }
                    console.log(data.getRecentROListByUser)
                    return(<Background>
                        <ROListForm ROlist={data.getRecentROListByUser.filter(v=>v.account_id._id==='5b518c4c031c7d0179e23b6a')} {...this.props} />
                    </Background>)
                }}
                </Query>
            </ApolloProvider>
        )
    }
}

export default ROListPage