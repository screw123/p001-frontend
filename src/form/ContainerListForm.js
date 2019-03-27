import React from 'react'
import InfoList, {InfoListStandardLine} from '../component/InfoList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Tag, ToolTip} from '../component/BasicComponents.js'
import DocLine from '../component/DocLine.js'
import { Redirect } from "react-router-dom"

import ContainerDetailsForm from '../form/ContainerDetailsForm.js'
import Modal from '../component/Modal.js'
import { ApolloProvider, Mutation } from 'react-apollo'

import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

export const getContainerStatusColor = (status) =>{
    switch(status) {
        case 'EMPTY':
            return {background: 'DeepSkyBlue', color: 'Black'}
        case 'STORED':
            return {background: 'Gold', color: 'Black'}
        case 'PENDING_OUTBOUND':
            return {background: 'Tomato', color: 'White'}
        case 'IN_TRANSIT_TO_CUSTOMER':
            return {background: 'Forest', color: 'White'}
        case 'WITH_CUSTOMER':
            return {background: 'Tomato', color: 'White'}
        case 'PENDING_INBOUND':
            return {background: 'OrangeRed', color: 'Gold'}
        case 'IN_TRANSIT_TO_WAREHOUSE':
            return {background: 'OrangeRed', color: 'Gold'}
        case 'DISBANDED':
            return {background: 'DimGrey', color: 'White'}
        default:
            return {}
    }
}

export default class ContainerListForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            container: undefined,
            showContainerDetailsModal: false,
        }
        this.containerLine = this.containerLine.bind(this)
        this.setRedirect = this.setRedirect.bind(this)
        this.toggleContainerDetailsModal = this.toggleContainerDetailsModal.bind(this)

    }

    toggleContainerDetailsModal = (doc) => {
        console.log('doc=', doc)
        if (doc) {
            this.setState(prevState=> ({
                container: doc,
                showContainerDetailsModal: !prevState.showContainerDetailsModal
            }))
        }
        else { this.setState(prevState=> ({showContainerDetailsModal: !prevState.showContainerDetailsModal}) ) }
    }

    setRedirect = (container) => this.setState({container: container})

    containerLine = ({rowObj, data, multiSelect}, buttons) => {
        let { _id, billedAmt, status, paidAmt, createDateTime, docLines, docType} = data
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
                    this.toggleContainerDetailsModal(data)
                }}
                content={<React.Fragment>
					<DocLine.Status t={status} color={getContainerStatusColor} float='right' />
                    <DocLine.DateTime l='Box Rental Date' t={createDateTime} />
                    <DocLine.ID l='Record Number' t={_id} />
					<DocLine.DocType t={docType} float='right' />
                </React.Fragment>}
            />
        )
    }

    render() {
        const g = this.props.login
        const c = this.props.i18n
        
        if (this.state.container) return (<Redirect push to={{pathname: '/ContainerDetails', state: {container: this.state.container} }} /> )

        return(
            <React.Fragment>
                <InfoList 
                    rowHeightCalc={(i, width)=>{
                        const fixed_field_lines = 2
                        const containerSummary_lines = 1
 
                        //per field line * 1.5, per container line * 1.25, + 1.5line of buffer
                        return c.state.defaultHeight*1.5*fixed_field_lines + containerSummary_lines*32*1.25 / Math.floor(width*.95/DocLine.singleContainerDisplaySize) + c.state.defaultHeight*1.5
                    }}
                    headerText={<div><FontAwesomeIcon icon='boxes' /> {c.t('All stuffs')}</div>}
                    data={this.props.containerList || []} 
                    listComponent={this.containerLine}
                    refreshRowHeight={true}
                />
                {/*this.state.showContainerDetailsModal &&
                    <Modal
                        show={this.state.showContainerDetailsModal}
                        component={
                            <ContainerDetailsForm
                                container={this.state.container}
                                hideTitle={true}
                                {...this.props}
                            />
                        }
                        title={this.state.container.userDefinedName + ( (this.state.container.printId !== this.state.container.userDefinedName) ? " (" + this.state.container.printId + ")" : "")}
                        closeModal={this.toggleContainerDetailsModal}
                    />
                */}
                
            </React.Fragment>
        )
    }
}