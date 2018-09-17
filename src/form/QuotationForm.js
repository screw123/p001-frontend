import React from "react"
import { getPriceListByAccount, addQuotation } from '../gql/query.js'

import { Formik, Field, FieldArray } from 'formik'
import FormikForm, { TextField, FormButton, FormErr, FieldRow } from '../component/FormikForm.js'

import { I18n } from 'react-i18next'
import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import { ApolloProvider, Query, Mutation } from "react-apollo"
import {BigLoadingScreen} from '../component/Loading.js'

import merge from 'lodash/merge'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import pickBy from 'lodash/pickBy'

class Quotation extends React.Component {
    constructor(props) {
        super(props)
        this.transformPriceList = this.transformPriceList.bind(this)
        this.genQuotationFromPriceList = this.genQuotationFromPriceList.bind(this)
        this.genPricingGrid = this.genPricingGrid.bind(this)
        this.getPrice = this.getPrice.bind(this)
        this.updateValues = this.updateValues.bind(this)
        this.calcTotalAmt = this.calcTotalAmt.bind(this)
        this.state = {
            containerInitValue: {},
            fullPriceList: {},
            loadCount: 0
        }
    }
    
    transformPriceList = (p) => { //to transform a single priceList
        console.time('transformPriceList')
        const result = {}
        for(let i = 0; i<p.length;i++){
            const itemCode = p[i].SKU_id.shortCode
            const rentMode = p[i].rentMode
            const duration = p[i].duration
            let pricing = {}
            pricing[itemCode] = merge({}, p[i].SKU_id)
            pricing[itemCode]['mode'] = {}
            pricing[itemCode]['mode'][rentMode] = {}
            pricing[itemCode]['mode'][rentMode][duration] = omit(p[i], ['__typename', 'SKU_id', 'code', 'rentMode', 'duration'])
            merge(result, pricing)
        }
        console.timeEnd('transformPriceList')
        return result
    }
    
    transformPriceListMulti = (p) => { //to transform a multiple priceList
        console.time('transformPriceListMulti')
        console.log(p)
        const result = {}
        for(let i = 0; i<p.length;i++){
            const priceList = p[i].code
            const itemCode = p[i].SKU_id.shortCode
            const rentMode = p[i].rentMode
            const duration = p[i].duration
            let pricing = {}
            pricing[priceList] = {}
            pricing[priceList][itemCode] = merge({}, p[i].SKU_id)
            pricing[priceList][itemCode]['mode'] = {}
            pricing[priceList][itemCode]['mode'][rentMode] = {}
            pricing[priceList][itemCode]['mode'][rentMode][duration] = omit(p[i], ['__typename', 'SKU_id', 'code', 'rentMode', 'duration'])
            merge(result, pricing)
        }
        console.timeEnd('transformPriceListMulti')
        return result
    }
    
    genQuotationFromPriceList = (p, t) => { //p = priceList, t=translation object
        const SKUList = Object.keys(p)
        let SKUUIComponents = []
        let initialValue = {}
        
        for (let i=0; i<SKUList.length; i++) {
            const SKUObject = p[SKUList[i]] //SKUObject = {rentMode: {duration: rent}}
            const rentModeList = Object.keys(SKUObject.mode)
            let coms = []
            for (let j=0; j<rentModeList.length; j++) {
                
                const {com, initValue} = this.genPricingGrid(SKUObject.mode[rentModeList[j]], t, rentModeList[j])
                coms.push(com)
                if (initialValue[SKUList[i]]===undefined) { initialValue[SKUList[i]] = {} } 
                initialValue[SKUList[i]][rentModeList[j]] = initValue
            }
            SKUUIComponents.push(
                <div key={SKUObject._id}>
                    <h2>{t(SKUObject.name)}</h2>
                    <img src={SKUObject.smallPicURL} alt={SKUObject.name}/>
                    <div>{t(SKUObject.longDesc)}</div>
                    {coms}
                </div>
            )
            
        }
        return {coms: SKUUIComponents, initialValue: initialValue}
    }

    genPricingGrid = (mode, t, rentMode) => {
        //mode = {duration: {rent}}, t = translation function, rentMode = rentMode name ('MONTH', 'DAY', 'YEAR')
        const modeList = Object.keys(mode)
        let pricingGrid = []
        let initValue = {}
        
        //get previous Quotation as long as it exists and matches current account id
        let prevQuotation = undefined
        if (typeof(Storage) !== "undefined") {
            console.log(window.localStorage.Quotation)
            prevQuotation = JSON.parse(window.localStorage.Quotation)
            if ((prevQuotation.account_id._id===this.props.account_id)||(prevQuotation.account_id._id===null)) {}
            else { prevQuotation=undefined }
        }
        
        
        for (let i=0; i<modeList.length; i++) {
            const m = mode[modeList[i]]
            
            //if prev Quotation exist + priceList_id matches, get the qty, else =0
            if (prevQuotation!==undefined) { 
                const v = prevQuotation.quotationDetails.find(v => m._id === v.priceList_id._id)
                if (v) { initValue[modeList[i]] = v.qty }
                else { initValue[modeList[i]] = 0}
            }
            else { initValue[modeList[i]] = 0 }
            
            pricingGrid.push(
                <div key={m._id}>
                    <h3>{modeList[i] + ' ' + t(rentMode)}</h3>
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
    
    updateValues = (priceList, values, fieldName, fieldValue, setFieldValue) => { //setFieldValue for container type and totalAmt
        console.time('updateValues')
        let totalAmt = 0
        const qty = values.containers
        setFieldValue(fieldName, fieldValue) //setFieldValue for container type first
        
        //Calculate total amt below
        totalAmt = this.calcTotalAmt(qty, fieldName, fieldValue, priceList)
        setFieldValue('totalAmt', totalAmt)
        console.timeEnd('updateValues')
    }
    
    calcTotalAmt = (qty, fieldName, fieldValue, priceList) => {
        //qty=value.containers
        //fieldName = fieldName from Formik.  If calc out of Formik, just give ''
        //If calc out of Formik, just give 0
        
        let totalAmt = 0
        const containerType = Object.keys(qty)
        for (let i=0; i<containerType.length; i++) {
            let rentMode = Object.keys(qty[containerType[i]])
            for (let j=0; j<rentMode.length; j++) {
                let duration = Object.keys(qty[containerType[i]][rentMode[j]])
                for (let k=0; k<duration.length; k++) {
                    
                    //fieldName, by default, is 'containers.'+containerType[i]+'.'+rentMode[j] + '.'+duration[k]
                    //because setFieldValue is async, we cannot use the values.containers in Formik immediately after setFieldValue
                    //therefore we go around this, by compare fieldName vs path,
                    //where path is how we are traversing the values.containers object structure
                    
                    const path = 'containers.'+containerType[i]+'.'+rentMode[j] + '.'+duration[k]
                    let typeQty = qty[containerType[i]][rentMode[j]][duration[k]]
    
                    if (path===fieldName) { typeQty = fieldValue }
                    
                    if (typeQty>0) {
                        totalAmt = totalAmt + (priceList[containerType[i]]['mode'][rentMode[j]][duration[k]].rent * typeQty)
                    }
                }
            }
        }
        return totalAmt
    }
    
    render(){ 
        
        return (
        <GqlApiSubscriber>
        {(g)=>(
            <I18n>
            {(t)=>(
                <ApolloProvider client={(g.state.isLogined)? GqlApi.getGqlClient() : GqlApi.getGqlClientPublic()}>
                    <Query query={getPriceListByAccount} variables={{account_id: this.props.account_id}}>
                    {({ client, loading: queryLoading, error: queryErr, data, refetch }) => (
                        <Mutation mutation={addQuotation} errorPolicy="all">
                        {(mutate, {loading: mutateLoading, err: mutateErr})=>{
                        
                            if (queryLoading) return (<BigLoadingScreen text={'Getting your best price...'}/>)
                            
                            if (queryErr) {
                                console.log('QuotationForm', queryErr, this.props.account_id)
                                return (<p>Error :(</p>)
                            }
                            
                            //Full price list converts what DB sends back into {priceList: {box: {rentMode: }}}
                            const fullPriceList = this.transformPriceList(data.getPriceListByAccount)
                            console.log('priceList=',fullPriceList)
                            
                            //coms is the list of components.  InitialValue is the structure for Formik
                            const {coms, initialValue} = this.genQuotationFromPriceList(fullPriceList, t)
                            console.log('initialValue=', initialValue)
                            
                            return(
                                <div>{coms}
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        containers: initialValue,
                                        totalAmt: 0
                                    }}
                                    validate={ (values)=>{
                                        //need to charge minimum
                                        return {}
                                    }}
                                    onSubmit={async (values, actions) => {
                                        let quotation_lines = []
                                        const containerType = Object.keys(values.containers)
                                            
                                        for (let i=0; i<containerType.length; i++) {
                                        
                                            //rentMode = 'DAY', 'MONTH', 'YEAR', ...
                                            let rentMode = Object.keys(values.containers[containerType[i]])
                                            
                                            for (let j=0; j<rentMode.length; j++) {
                                            
                                                let duration = Object.keys(values.containers[containerType[i]][rentMode[j]])
                                                
                                                for (let k=0; k<duration.length; k++) {
                                                    if (values.containers[containerType[i]][rentMode[j]][duration[k]]>0) {
                                                        quotation_lines.push({
                                                            priceList_id: fullPriceList[containerType[i]]['mode'][rentMode[j]][duration[k]]._id,
                                                            qty: values.containers[containerType[i]][rentMode[j]][duration[k]],
                                                            remarks: ''
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                        console.log(quotation_lines)
                                        try {
                                            const d = await mutate({variables: {
                                                account_id: this.props.account_id,
                                                quotationLines: quotation_lines
                                            }})
                                            console.log('server return', d)
                                            
                                            //save the submitted quotation to localStorage
                                            //The only use of this local stored quotation is for auto filling number of boxes ordered, nothing more.  Do not use to show amount to user
                                            //and do not use the quotation id anymore.
                                            if (typeof(Storage) !== "undefined") {
                                                window.localStorage.setItem('Quotation', JSON.stringify(d.data.addQuotation))
                                            }
                                        }
                                        catch(e) { console.log(e) }
                                        actions.setSubmitting(false)
                                    }}
                                >
                                {({ errors, isSubmitting, setFieldValue, dirty, touched, values, status }) => (
                                    <FormikForm>
                                        <FieldArray name="orders" render={(arrayHelper)=> {
                                            let r = []
                                            
                                            //containerType = 'STANDARD', 'HIGH VALUE', ...
                                            const containerType = Object.keys(values.containers)
                                            
                                            for (let i=0; i<containerType.length; i++) {
                                            
                                                //rentMode = 'DAY', 'MONTH', 'YEAR', ...
                                                let rentMode = Object.keys(values.containers[containerType[i]])
                                                
                                                for (let j=0; j<rentMode.length; j++) {
                                                
                                                    let duration = Object.keys(values.containers[containerType[i]][rentMode[j]])
                                                    
                                                    for (let k=0; k<duration.length; k++) {
                                                        
                                                    
                                                        r.push(<Field
                                                            name={'containers.' + containerType[i] + '.' + rentMode[j] + '.' + duration[k]}
                                                            component={TextField}
                                                            label={t(containerType[i]) + ', ' + duration[k] + ' ' + t(rentMode[j])}
                                                            value={values.containers[containerType[i]][rentMode[j]][duration[k]]}
                                                            key={containerType[i]+'.'+rentMode[j]+'.'+duration[k]}
                                                            onChange={(e)=> {
                                                                //if (+e.target.value!== +e.target.value) {//not a value
                                                                if (!isNaN(parseInt(e.target.value|0, 10))) { this.updateValues(fullPriceList, values, e.target.name, Math.abs(parseInt(e.target.value|0, 10)), setFieldValue) }
                                                            }}
                                                        />)
                                                    }
                                                }
                                                
                                            }
                                            return r
                                        }}
                                        />
                                        <p>Total amount: {values.totalAmt}</p>
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
                                </Formik></div>
                            )
                        }}
                        </Mutation>
                    )}
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