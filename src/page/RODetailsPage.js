import React from "react"

import RODetailsForm from '../form/RODetailsForm.js'
import {Background} from '../component/BasicComponents.js'
import { getAccountById } from '../gql/query.js'
import {BigLoadingScreen} from '../component/Loading.js'
import parseApolloErr from '../util/parseErr.js'
import { ApolloProvider, Query } from 'react-apollo'
import SystemError from '../component/SystemError.js'


import get from 'lodash/get'

class RODetailsPage extends React.Component {
    
    render() { 
        const g = this.props.login
		const c = this.props.i18n
		
        let RO = get(this.props, 'location.state.RO', undefined) || this.props.RO || undefined
		let RO_id= this.props.RO_id || this.props.match.params.RO_id || undefined
		if ((RO===undefined) && (RO_id===undefined)) {
			return (<SystemError>{'Error: Account not specified'}</SystemError>)
		}

		let mode = this.props.mode || this.props.match.params.mode || 'view'

		if (RO!==undefined) { 

			return(
				<Background>
					<h1>Edit Account</h1>
					<RODetailsForm RO={RO} mode={mode} {...this.props} />
				</Background>
			)
		}
		else {return(
			<ApolloProvider client={g.getGqlClient()}>
				<Query query={getAccountById} variables={{RO_id: RO_id}} notifyOnNetworkStatusChange>
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
						<h1>{c.t('Edit Account Info')}</h1>
						<RODetailsForm 
							RO={data.getAccountById}
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

export default RODetailsPage