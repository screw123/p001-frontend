import React from 'react'
import InfoList, {InfoListStandardLine} from '../component/InfoList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Tag, ToolTip} from '../component/BasicComponents.js'
import DocLine from '../component/DocLine.js'
import { Redirect } from "react-router-dom"

import { ApolloProvider, Mutation } from 'react-apollo'

import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

/*
{
    "_id": "5c2df683c3287648fca2fe03",
    "account_id": "5b518c4c031c7d0179e23b6a",
    "accountType": "PERSONAL",
    "billedAmt": 176,
    "billingAddress": {
        "addressCountry": "NEW TERRITORIES",
        "addressRegion1": "ccc",
        "addressRegion2": "ddd",
        "legalName": "aaa",
        "streetAddress": "bbbaaa",
        "telephone": "52525252"
    },
    "billingAddress_id": "5c07a1345010625008c21c2b",
    "createBy_id": "5b518c4b031c7d0179e23b69",
    "createDateTime": "2019-01-03T11:48:19.518Z",
    "docEvent_id": [
        "5c2df683c3287648fca2fe04",
        "5c2df687c3287648fca2fe09"
    ],
    "docLines": [
        {
            "duration": 5,
            "qty": 44,
            "rent_lineTotal": 176,
            "rent_unitPrice": 4,
            "rentMode": "DAY",
            "SKU_id": "5b110d2d4e3d922dacfd3ed6",
            "SKUName": "Standard Box"
        }
    ],
    "invoiceList": [
        {
            "_id": "5c2df684c3287648fca2fe05",
            "settledAmt": 176,
            "status": "FULL_SETTLED",
            "totalAmt": 176
        }
    ],
    "paidAmt": 176,
    "printCount": 0,
    "quotation_id": "5c2df65bc3287648fca2fe01",
    "status": "PROCESSING_PAID",
    "totalAmt": 176,
    "updateBy_id": "5b518c4b031c7d0179e23b69",
    "updateDateTime": "2019-01-03T11:48:23.475Z",
    "version": "1.0"
}
*/

const getROStatusColor = (status) =>{
    switch(status) {
        case 'INIT':
            return {background: 'DeepSkyBlue', color: 'Black'}
        case 'PROCESSING_PAID':
            return {background: 'Gold', color: 'Black'}
        case 'PROCESSING_UNPAID':
            return {background: 'Tomato', color: 'White'}
        case 'COMPLETED_PAID':
            return {background: 'Forest', color: 'White'}
        case 'COMPLETED_UNPAID':
            return {background: 'Tomato', color: 'White'}
        case 'HOLD':
            return {background: 'OrangeRed', color: 'Gold'}
        case 'CANCELLED':
            return {background: 'DimGrey', color: 'White'}
        default:
            return {}
    }
}

export default class ROListForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={RO: undefined}
        this.ROLine = this.ROLine.bind(this)
        this.setRedirect = this.setRedirect.bind(this)
    }

    setRedirect = (RO) => this.setState({RO: RO})

    ROLine = ({rowObj, data}, buttons) => {
        let { _id, billedAmt, status, paidAmt, createDateTime, docLines} = data
        return (
            <InfoListStandardLine
                occupyFullRow={true}
                key={rowObj.key}
                key1={rowObj.key}
                style={rowObj.style}
                contentOnClick={e=>{
                    e.preventDefault()
                    this.setRedirect(data)
                }}
                content={<div>
                    <DocLine.Status t={status} color={getROStatusColor} float='right' />
                    <DocLine.DateTime l='Box Rental Date' t={createDateTime} />
                    <DocLine.ID l='Record Number' t={_id} />
                    <DocLine.ContainerSummary docLines={docLines} />
                </div>}
            />
        )
    }

    render() {
        const g = this.props.login
        const c = this.props.i18n
        
        if (this.state.RO) {return(<Redirect push to={{pathname: '/ROdetails', state: {RO: this.state.RO} }} />)}
        return(<div>
            <InfoList 
                rowHeightCalc={()=>c.state.defaultHeight*1.5*4+c.state.defaultHeight*0.5}
                headerText={<div><FontAwesomeIcon icon='file-invoice' /> {c.t('Box Rental Record')}</div>}
                data={this.props.ROlist || []} 
                listComponent={this.ROLine}
            />
            
        </div>)
    }

}