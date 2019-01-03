import React from "react"

import EditAccountForm from '../form/EditAccountForm.js'
import {Background} from '../component/BasicComponents.js'
import { getAccountById } from '../gql/query.js'
import {BigLoadingScreen} from '../component/Loading.js'
import parseApolloErr from '../util/parseErr.js'
import { ApolloProvider, Query } from 'react-apollo'

import get from 'lodash/get'

class EditAccountPage extends React.Component {
    
    render() { 
        const g = this.props.login
		const c = this.props.i18n
		
        let account = get(this.props, 'location.state.account', undefined) || this.props.account || undefined
		let account_id= this.props.account_id || this.props.match.params.account_id || undefined
		if ((account===undefined) && (account_id===undefined)) {
			return (<p>{'Error: Account not specified'}</p>)
		}

		let mode = this.props.mode || this.props.match.params.mode || 'view'

		if (account!==undefined) { 

			return(
				<Background>
					<h1>Edit Account</h1>
					<EditAccountForm account={account} mode={mode} {...this.props} />
				</Background>
			)
		}
		else {return(
			<ApolloProvider client={g.getGqlClient()}>
				<Query query={getAccountById} variables={{account_id: account_id}} notifyOnNetworkStatusChange>
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
						<EditAccountForm 
							account={data.getAccountById}
							mode={mode}
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

export default EditAccountPage