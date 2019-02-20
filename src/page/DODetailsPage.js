import React from "react"

import DODetailsForm from '../form/DODetailsForm.js'
import {Background} from '../component/BasicComponents.js'
import { getDOById } from '../gql/query.js'
import {BigLoadingScreen} from '../component/Loading.js'
import parseApolloErr from '../util/parseErr.js'
import { ApolloProvider, Query } from 'react-apollo'
import SystemError from '../component/SystemError.js'

import get from 'lodash/get'

class DODetailsPage extends React.Component {
    
    render() { 
        const g = this.props.login
		const c = this.props.i18n
		
        let DO = get(this.props, 'location.state.DO', undefined) || this.props.DO || undefined
		let DO_id= get(this.props, 'location.state.DO_id', undefined) || this.props.DO_id || this.props.match.params.DO_id || undefined
		if ((DO===undefined) && (DO_id===undefined)) {
			return (<SystemError message='Error: Rental Order ID not specified' />)
		}

		let mode = this.props.mode || this.props.match.params.mode || 'view'

		if (DO!==undefined) { 

			return(
				<Background>
					<DODetailsForm DO={DO} mode={mode} {...this.props} />
				</Background>
			)
		}
		else {return(
			<ApolloProvider client={g.getGqlClient()}>
				<Query query={getDOById} variables={{DO_id: DO_id}} notifyOnNetworkStatusChange>
				{({ loading, error, data, networkStatus, refetch }) => {
					if (loading) return (<BigLoadingScreen text={'Loading...'}/>)
					if (error) {
						const errStack = parseApolloErr(error, c.t)

						return (
							<div>
								{errStack.map(v=>{ return <p>{v.message}</p> }) }
							</div>	
						)
					}

					return (<Background>
						<DODetailsForm 
							DO={data.getDOById}
							onInfoUpdate={()=>refetch()}
							gqlNetworkStatus={networkStatus}
							{...this.props}
						/>
					</Background>)
				}}
				</Query>
			</ApolloProvider>
		)}
		
		
	}
}

export default DODetailsPage