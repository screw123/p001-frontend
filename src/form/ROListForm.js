import React from 'react'
import styled from 'styled-components'
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

const InfoListStandardLineStyled = styled(InfoListStandardLine)`
  ${InfoListStandardLineStyled}:nth-child(odd){
    background-color: #F8F8F8;
  }
    border-radius: 16px;
`

const TableRow = styled.div`
  display: flex;
  flex-flow: row wrap;
`

/*
This make use of an array of Rental Order objects supplied as props, and put them together using InfoList.

InfoList for now is just an implementation of package "react-virtualized", which we will replace later.

RO is the short form of "Rental Order"

*/

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
            <InfoListStandardLineStyled
                occupyFullRow={true}
                multiSelect={multiSelect}
                key1={rowObj.key}
                key={rowObj.key}
                showBottomBorder={true}
                contentOnClick={e=>{
                    e.preventDefault()
                    this.setRedirect(data)
                }}
                content={<TableRow>
                    <DocLine.DateTime label='Box Rental Date' text={createDateTime} />
                    <DocLine.ID label='Record Number' text={_id} />
                    <DocLine.ContainerSummary docLines={docLines} />
                    <DocLine.Status text={status} color={getROStatusColor} />
                </TableRow>}
            />
        )
    }

    render() {
        const g = this.props.login
        const c = this.props.i18n
        
        if (this.state.RO) {return(<Redirect push to={{pathname: '/ROdetails', state: {RO_id: this.state.RO._id} }} />)}
        return(<div>
            <InfoList 

                /*
                    React-virtualized required a precise calculation of width and height.  This I come up with the formula below.  Feel free to update.
                    For current setup, each Rental Order must at least have 2 lines for basic info + 1 line per box/container ordered
                */
                rowHeightCalc={(i, width)=>{
                    const basic_info_lines = 2 
                    const containerSummary_lines = new Set(this.props.ROlist[i].docLines.map(v=>v.SKU_id.name)).size
                    const CSSrem = c.state.defaultHeight

                    //per field line * 1.5, per container line * 1.25, + 1.5line of buffer
                    return c.state.defaultHeight*1.5*basic_info_lines + containerSummary_lines*CSSrem*1.25 / Math.floor(width*.95/DocLine.singleContainerDisplaySize) + c.state.defaultHeight*5

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