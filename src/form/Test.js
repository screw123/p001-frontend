import React from "react"
import { getPriceListByAccount} from '../gql/query.js'

import { I18n } from 'react-i18next'
import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import { ApolloProvider, Query, Mutation } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'

import {DateTimePicker} from '../component/DateTimePicker.'

class Quotation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            containerInitValue: {},
            fullPriceList: {},
            loadCount: 0
        }
    }
    
    render(){ 
		const acct_id = this.props.account_id || 'aaa'
		
        return (
        <GqlApiSubscriber>
        {(g)=>(
            <I18n>
            {(t)=>(
                <ApolloProvider client={GqlApi.getGqlClientPublic()}>
                    <Query query={getPriceListByAccount} variables={{account_id: acct_id}}>
                    {({ client, loading: queryLoading, error: queryErr, data, refetch }) => {
                        
						if (queryLoading) return (<BigLoadingScreen text={'Getting your best price...'}/>)
						
						if (queryErr) {
							console.log('QuotationForm', queryErr, this.props.account_id)
							return (<p>Error :(</p>)
						}

						console.log('priceList=',data.getPriceListByAccount)
						
						return(
							<div>Hello</div>
						)
                    }}
                    </Query>
                </ApolloProvider>
            )}
            </I18n>
        )}
        </GqlApiSubscriber>
    )}
                
}

export const OrderField = ({
    field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
    form: { touched }, //also values, handleXXXX, dirty, isValid, status, etc.
    classNames, label, rightIcon, err, hidden, DescCom, ...props }) => { return (
        
        <div>
            <DescCom />
            <input {...fields} {...props} name={name} />
        </div>
        
        
)}




export default Quotation