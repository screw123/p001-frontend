import React from "react"

import PUODetailsForm from '../form/PUODetailsForm.js'
import {Background} from '../component/BasicComponents.js'
import { getPUOById } from '../gql/query.js'
import {BigLoadingScreen} from '../component/Loading.js'
import parseApolloErr from '../util/parseErr.js'
import { ApolloProvider, Query } from 'react-apollo'
import SystemError from '../component/SystemError.js'

import get from 'lodash/get'

class PUODetailsPage extends React.Component {
    
    render() { 
        const g = this.props.login
		const c = this.props.i18n
		
        let PUO = get(this.props, 'location.state.PUO', undefined) || this.props.PUO || undefined
		let PUO_id= get(this.props, 'location.state.PUO_id', undefined) || this.props.PUO_id || this.props.match.params.PUO_id || undefined
		if ((PUO===undefined) && (PUO_id===undefined)) {
			return (<SystemError message='Error: Rental Order ID not specified' />)
		}

		let mode = this.props.mode || this.props.match.params.mode || 'view'

		if (PUO!==undefined) { 

			return(
				<Background>
					<PUODetailsForm PUO={PUO} mode={mode} {...this.props} />
				</Background>
			)
		}
		else {return(
			<ApolloProvider client={g.getGqlClient()}>
				<Query query={getPUOById} variables={{PUO_id: PUO_id}} notifyOnNetworkStatusChange>
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
						<PUODetailsForm 
							PUO={data.getPUOById}
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

export default PUODetailsPage