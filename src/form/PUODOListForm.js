import React from 'react'
import InfoList, {InfoListStandardLine} from '../component/InfoList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Tag, ToolTip} from '../component/BasicComponents.js'
import DocLine from '../component/DocLine.js'
import { Redirect } from "react-router-dom"
import Modal from '../component/Modal.js'

import PUODetailsForm from './PUODetailsForm.js'
import DODetailsForm from './DODetailsForm.js'

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

export default class PUODOListForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            selectedDoc: undefined,
            showDODetailsModal: false,
            showPUODetailsModal: false
        }
        this.PUODOLine = this.PUODOLine.bind(this)
        this.toggleDODetailsModal = this.toggleDODetailsModal.bind(this)
        this.togglePUODetailsModal = this.togglePUODetailsModal.bind(this)
    }

    toggleDODetailsModal = (doc) => {
        if (doc) {
            this.setState(prevState=> ({
                selectedDoc: doc,
                showDODetailsModal: !prevState.showDODetailsModal
            }))
        }
        else { this.setState(prevState=> ({showDODetailsModal: !prevState.showDODetailsModal}) ) }
    }

    togglePUODetailsModal = (doc) => {
        console.log(doc)
        if (doc) {
            this.setState(prevState=> ({
                selectedDoc: doc,
                showPUODetailsModal: !prevState.showPUODetailsModal
            }))
        }
        else { this.setState(prevState=> ({showPUODetailsModal: !prevState.showPUODetailsModal}) ) }
    }

    PUODOLine = ({rowObj, data, multiSelect}, buttons) => {
        let { _id, billedAmt, status, paidAmt, createDateTime, docLines, docType} = data
        const toggleModel = docType==='PickUpOrder' ? this.togglePUODetailsModal: this.toggleDODetailsModal
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
                    toggleModel(data)
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
        
        if (this.state.PUODO) {
            if (this.state.PUODO.docType==='PickUpOrder') {
                return(<Redirect push to={{pathname: '/PUOdetails', state: {PUO_id: this.state.PUODO._id} }} />)
            }
            return(<Redirect push to={{pathname: '/DOdetails', state: {DO_id: this.state.PUODO._id} }} />)
        }
        return(
            <React.Fragment>
                <InfoList 
                    rowHeightCalc={(i, width)=>{
                        const fixed_field_lines = 2
                        const containerSummary_lines = new Set(this.props.PUODOlist[i].docLines.map(v=>v.SKU_id.name)).size

                        //per field line * 1.5, per container line * 1.25, + 1.5line of buffer
                        return c.state.defaultHeight*1.5*fixed_field_lines + containerSummary_lines*32*1.25 / Math.floor(width*.95/DocLine.singleContainerDisplaySize) + c.state.defaultHeight*1.5

                    }}
                    headerText={<div><FontAwesomeIcon icon='file-invoice' /> {c.t('Box Movement Record')}</div>}
                    data={this.props.PUODOlist || []} 
                    listComponent={this.PUODOLine}
                    refreshRowHeight={true}
                />
                {this.state.showPUODetailsModal &&
                    <Modal
                        show={this.state.showPUODetailsModal}
                        component={
                            <PUODetailsForm
                                PUO={this.state.selectedDoc}
                                {...this.props}
                            />
                        }
                        closeModal={this.togglePUODetailsModal}
                    />
                }
                {this.state.showDODetailsModal &&
                    <Modal
                        show={this.state.showDODetailsModal}
                        component={
                            <DODetailsForm
                                DO={this.state.selectedDoc}
                                {...this.props}
                            />
                        }
                        closeModal={this.toggleDODetailsModal}
                    />
                }
            </React.Fragment>
        )
    }
}