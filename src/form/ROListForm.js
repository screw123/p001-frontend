import React from 'react'
import InfoList, {InfoListStandardLine} from '../component/InfoList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    Tag, 
    ToolTip, 
    HeaderCards
} 
from '../component/BasicComponents.js'

import DocLine from '../component/DocLine.js'
import { Redirect } from "react-router-dom"

import { ApolloProvider, Mutation } from 'react-apollo'

import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

export const getROStatusColor = (status) =>{
    switch(status) {
        case 'INIT':
            return {background: 'transparent', color: 'Black'}
        case 'PROCESSING_PAID':
            return {background: 'transparent', color: '#0FAAC5'}
        case 'PROCESSING_UNPAID':
            return {background: 'transparent', color: '#D70000'}
        case 'COMPLETED_PAID':
            return {background: 'transparent', color: '#45AE06'}
        case 'COMPLETED_UNPAID':
            return {background: 'transparent', color: '#D70000'}
        case 'HOLD':
            return {background: 'transparent', color: '#787F84'}
        case 'CANCELLED':
            return {background: 'transparent', color: '#D70000'}
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

    ROLine = ({rowObj, data, multiSelect}, buttons) => {
        let { _id, billedAmt, status, paidAmt, createDateTime, docLines} = data
        return (
            <InfoListStandardLine
                occupyFullRow={true}
                multiSelect={multiSelect}
                key1={rowObj.key}
                key={rowObj.key}
                style={rowObj.style}
                showBottomBorder={true}
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
        
        if (this.state.RO) {return(<Redirect push to={{pathname: '/ROdetails', state: {RO_id: this.state.RO._id} }} />)}
        return(<div>
            <InfoList 
                rowHeightCalc={(i, width)=>{
                    const fixed_field_lines = 2
                    const containerSummary_lines = new Set(this.props.ROlist[i].docLines.map(v=>v.SKU_id.name)).size

                    //per field line * 1.5, per container line * 1.25, + 1.5line of buffer
                    return c.state.defaultHeight*1.5*fixed_field_lines + containerSummary_lines*32*1.25 / Math.floor(width*.95/DocLine.singleContainerDisplaySize) + c.state.defaultHeight*1.5

                }}
                headerText = {
                    <HeaderCards>
                        {c.t('Box Rental Record')}
                    </HeaderCards>
                }

                data={this.props.ROlist || []} 
                listComponent={this.ROLine}
                refreshRowHeight={true}
            />
            
        </div>)
    }
}