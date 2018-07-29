import React from "react"
import { getMyPriceList, getDefaultPriceList, addQuotation } from '../gql/query.js'
import Background from '../component/Background.js'

import { Formik, Field } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FieldRow } from '../component/FormikForm.js'
import styled from 'styled-components'

import { I18n } from 'react-i18next'
import GqlApi from '../container/GqlApi.js'
import { ApolloProvider, Query, Mutation } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'

import merge from 'lodash/merge'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'

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
            const itemCode = p[i].SKU_id.shortCode
            const rentMode = p[i].rentMode
            let pricing = {}
            pricing[priceList] = {}
            pricing[priceList][itemCode] = merge({}, p[i].SKU_id)
            pricing[priceList][itemCode]['mode'] = {}
            pricing[priceList][itemCode]['mode'][rentMode] = omit(p[i], ['__typename', 'SKU_id', 'code', 'rentMode'])
            merge(result, pricing)
        }
        console.timeEnd('getPriceListByCode')
        return result
    }
    
    genQuotationFromPriceList = (p, t) => {
        console.log(p)
        const SKUList = Object.keys(p)
        let SKUUIComponents = []
        let initialValue = {}
        for (let i=0; i<SKUList.length; i++) {
            const SKUObject = p[SKUList[i]]
            const {com, initValue} = this.genPricingGrid(SKUObject.mode, t)
            SKUUIComponents.push(
                <div key={SKUObject._id}>
                    <h2>{t(SKUObject.name)}</h2>
                    <img src={SKUObject.smallPicURL} />
                    <div>{t(SKUObject.longDesc)}</div>
                    {com}
                </div>
            )
            initialValue[SKUList[i]] = initValue
            
        }
        return {coms: SKUUIComponents, initialValue: initialValue}
    }

    genPricingGrid = (mode, t) => {
        const modeList = Object.keys(mode)
        let pricingGrid = []
        let initValue = {}
        for (let i=0; i<modeList.length; i++) {
            const m = mode[modeList[i]]
            initValue[modeList[i]] = 0
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
        return {com: pricingGrid, initValue: initValue}
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
                    {({ client, loading: queryLoading, error: queryErr, data, refetch }) => (
                        <Mutation mutation={addQuotation} errorPolicy="all">
                        {(mutate, {loading: mutateLoading, err: mutateErr})=>{
                        
                            if (queryLoading) return (<BigLoadingScreen/>)
                            
                            if (queryErr) return (<p>Error :(</p>)
                            
                            //Full price list converts what DB sends back into {priceList: {box: {rentMode: }}}
                            const fullPriceList = this.getPriceListByCode((GqlApi.state.isLogined)? data.getMyPriceList: data.getDefaultPriceList)
                            
                            //coms is the list of components.  InitialValue is the structure for Formik
                            const {coms, initialValue} = this.genQuotationFromPriceList(fullPriceList.DEFAULT, t)
                            console.log('coms=',coms, 'initialValue=', initialValue)
                            return(
                                <Formik
                                    initialValues={initialValue}
                                    validate={ (values) => {
                                        return {}  //Fixme do some basic checking.  TBC if it's necessary
                                    }}
                                    onSubmit={async (values, actions) => {
                                        actions.setStatus('')
                                        actions.setSubmitting(false)
                                    }}
                                >
                                {({ errors, isSubmitting, dirty, touched, values, status, initialValues }) => (
                                    <FormikForm>
                                        <FormErr>{status}</FormErr>
                                        <FieldRow>
                                            <FormButton
                                                type="submit"
                                                disabled={isSubmitting || !isEmpty(pickBy(errors)) || !dirty}
                                            >
                                                { t('Submit')}
                                            </FormButton>
                                            
                                        </FieldRow>
                                        
                                    </FormikForm>
                                )}
                                </Formik>
                            )
                        }}
                        </Mutation>
                    )}
                    </Query>
                </Background>
            </ApolloProvider>
        )}
        </I18n>
    )}
                
}

export const OrderField = ({
    field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
    form: { touched }, //also values, handleXXXX, dirty, isValid, status, etc.
    classNames, label, rightIcon, err, hidden, DescCom, ...props }) => {
        
        <div>
            <DescCom />
            <input {...fields} {...props} name={name} />
        </div>
        
        
}




export default Quotation