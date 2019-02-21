import React from 'react'
import InfoList, {InfoListStandardLine} from '../component/InfoList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Tag, ToolTip} from '../component/BasicComponents.js'
import DocLine from '../component/DocLine.js'
import { Redirect } from "react-router-dom"

import { ApolloProvider, Mutation } from 'react-apollo'

import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

export const getPUODOStatusColor = (status) =>{
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

export default class ContainerListForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={container: undefined}
        this.containerLine = this.containerLine.bind(this)
        this.setRedirect = this.setRedirect.bind(this)
    }

    setRedirect = (container) => this.setState({container: container})

    containerLine = ({rowObj, data, multiSelect}, buttons) => {
        let { _id, billedAmt, status, paidAmt, createDateTime, docLines, docType} = data
        return (
            <InfoListStandardLine
                occupyFullRow={true}
                multiSelect={multiSelect}
                key1={rowObj.key}
                style={rowObj.style}
                showBottomBorder={true}
                contentOnClick={e=>{
                    e.preventDefault()
                    this.setRedirect(data)
                }}
                content={<div>
					<DocLine.Status t={status} color={getPUODOStatusColor} float='right' />
                    <DocLine.DateTime l='Box Rental Date' t={createDateTime} />
                    <DocLine.ID l='Record Number' t={_id} />
					<DocLine.DocType t={docType} float='right' />
                </div>}
            />
        )
    }

    render() {
        const g = this.props.login
        const c = this.props.i18n
        
        if (this.state.container) {
            return(<Redirect push to={{pathname: '/ContainerDetails', state: {container_id: this.state.container._id} }} />)
        }
        return(<div>
            <InfoList 
                rowHeightCalc={(i, width)=>{
                    const fixed_field_lines = 2
                    const containerSummary_lines = 1

                    //per field line * 1.5, per container line * 1.25, + 1.5line of buffer
                    return c.state.defaultHeight*1.5*fixed_field_lines + containerSummary_lines*32*1.25 / Math.floor(width*.95/DocLine.singleContainerDisplaySize) + c.state.defaultHeight*1.5
                }}
                headerText={<div><FontAwesomeIcon icon='file-invoice' /> {c.t('Your Boxes')}</div>}
                data={this.props.containerList || []} 
                listComponent={this.containerLine}
                refreshRowHeight={true}
            />
            
        </div>)
    }
}