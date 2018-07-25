import React from "react"
import { getMyPriceList, getDefaultPriceList } from '../gql/query.js'
import Background from '../component/Background.js'

import { I18n } from 'react-i18next'
import GqlApi from '../container/GqlApi.js'
import { ApolloProvider, Query } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'

import merge from 'lodash/merge'
import omit from 'lodash/omit'

class Quotation extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loadData: false }
        this.getPriceListByCode = this.getPriceListByCode.bind(this)
        this.genQuotationFromPriceList = this.genQuotationFromPriceList.bind(this)
        this.genPricingGrid = this.genPricingGrid.bind(this)
        this.getPrice = this.getPrice.bind(this)
    }
    
    getPriceListByCode = (p) => {
        console.time('getPriceListByCode')
        const result = {}
        for(let i = 0; i<p.length;i++){
            const priceList = p[i].code
            const itemCode = p[i].item_id.shortCode
            const rentMode = p[i].rentMode
            let pricing = {}
            pricing[priceList] = {}
            pricing[priceList][itemCode] = merge({}, p[i].item_id)
            pricing[priceList][itemCode]['mode'] = {}
            pricing[priceList][itemCode]['mode'][rentMode] = omit(p[i], ['__typename', 'item_id', 'code', 'rentMode'])
            merge(result, pricing)
        }
        console.timeEnd('getPriceListByCode')
        return result
    }
    
    genQuotationFromPriceList = (p, t) => {
        console.log(p)
        const SKUList = Object.keys(p)
        let SKUUIComponents = []
        for (let i=0; i<SKUList.length; i++) {
            const SKUObject = p[SKUList[i]]
            SKUUIComponents.push(
                <div key={SKUObject._id}>
                    <h2>{t(SKUObject.name)}</h2>
                    <img src={SKUObject.smallPicURL} />
                    <div>{t(SKUObject.longDesc)}</div>
                    {this.genPricingGrid(SKUObject.mode, t)}
                </div>
            )
        }
        return SKUUIComponents
    }

    genPricingGrid = (mode, t) => {
        const modeList = Object.keys(mode)
        let pricingGrid = []
        for (let i=0; i<modeList.length; i++) {
            const m = mode[modeList[i]]
            pricingGrid.push(
                <div key={m._id}>
                    <h3>{t(modeList[i])}</h3>
                    <div><b>{t('Rent')}:</b>{m.rent}</div>
                    <div>{t('Shipping you the empty box')}: {this.getPrice(m.ship_first_base, t)}({t('Basic')})/{this.getPrice(m.ship_first_perPiece, t)}({t('Per Piece')})</div>
                    <div>{t('You send the box for archive')}: {this.getPrice(m.ship_in_base, t)}({t('Basic')})/{this.getPrice(m.ship_in_perPiece, t)}({t('Per Piece')})</div>
                    <div>{t('Request box delivery')}: {this.getPrice(m.ship_out_base, t)}({t('Basic')})/{this.getPrice(m.ship_out_perPiece, t)}({t('Per Piece')})</div>
                    <div>{t('Termination of service')}: {this.getPrice(m.ship_last_base, t)}({t('Basic')})/{this.getPrice(m.ship_last_perPiece, t)}({t('Per Piece')})</div>
                </div>
            )
        }
        return pricingGrid
    }

    getPrice = (p, t) => {
        if (p===0) return t('FREE')
        else return p
    }

    render(){ return (
        <I18n>
        {(t)=>(
            <ApolloProvider client={(GqlApi.state.isLogined)? GqlApi.getGqlClient(): GqlApi.getGqlClientPublic()}>
                <Background>
                    <Query query={(GqlApi.state.isLogined)? getMyPriceList: getDefaultPriceList}>
                    {({ client, loading, error, data, refetch }) => {
                        if (loading) return (<BigLoadingScreen/>)
                        if (error) return (<p>Error :(</p>)
                        const fullPriceList = this.getPriceListByCode(data.getMyPriceList)
                        return(
                            <div>
                                {this.genQuotationFromPriceList(fullPriceList.DEFAULT, t)}
                            </div>
                        )
                    }}
                    </Query>
                </Background>
            </ApolloProvider>
        )}
        </I18n>
    )}
                
}

export default Quotation