import React from "react"
import { getMyPriceList, getDefaultPriceList } from '../gql/query.js'
import Background from '../component/Background.js'

import GqlApi from '../container/GqlApi.js'
import { ApolloProvider, Query } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'

import merge from 'lodash/merge'

class Quotation extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loadData: false }
        this.getPriceListByCode = this.getPriceListByCode.bind(this)
    }
    
    getPriceListByCode = (p) => {
        console.time('getPriceListByCode')
        const result = {}
        for(let i = 0; i<p.length;i++){
            const priceList = p[i].code
            const itemCode = p[i].item_id.shortCode
            const rentMode = p[i].rentMode
            console.log(priceList, itemCode, rentMode)
            let pricing = {}
            pricing[priceList] = {}
            pricing[priceList][itemCode] = merge({}, p[i].item_id)
            pricing[priceList][itemCode][rentMode] = p[i]
            merge(result, pricing)
        }
        console.timeEnd('getPriceListByCode')
        return result
    }
    
    render(){ return (
        <ApolloProvider client={(GqlApi.state.isLogined)? GqlApi.getGqlClient(): GqlApi.getGqlClientPublic()}>
            <Background>
                <Query query={(GqlApi.state.isLogined)? getMyPriceList: getDefaultPriceList}>
                {({ client, loading, error, data, refetch }) => {
                    if (loading) return (<BigLoadingScreen/>)
                    if (error) return (<p>Error :(</p>)
                    
                    return(
                        <pre>{JSON.stringify(this.getPriceListByCode(data.getMyPriceList),null, 4)}</pre>
                        //Fixme, to show data in UI
                    )
                }}
                </Query>
            </Background>
        </ApolloProvider>
    )}
                
}

export default Quotation