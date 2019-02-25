import React from 'react'
import get from 'lodash/get'
import styled from "styled-components"

import { Container, ButtonsDiv, FieldsDiv, RecordID, DateOnly, DateTime, Text, Num, Dollar, Address, PUODODocLines, Status} from '../component/DocDetails.js'
import SystemError from '../component/SystemError.js'
import {getROStatusColor} from './ROListForm.js'

class PUODetailsForm extends React.PureComponent {

	render() {
        const g = this.props.login
        const c = this.props.i18n
        const PUO = this.props.PUO
        if (!PUO) return(<SystemError message='Pick Up Order is not available' errorData={{PUO: undefined}} />)

        let role = 'viewer'
        if (g.state.myself.accountOwn_id.find(v=>v._id===PUO.account_id._id)) { role='owner'}
        if (g.state.myself.accountManage_id.find(v=>v._id===PUO.account_id._id)) { role='manager'}

		return (<Container>
            <RecordID id={PUO._id} docType='PickUpOrder' />
            <ButtonsDiv>
                
            </ButtonsDiv>
            <FieldsDiv>
                <DateOnly title='createDateTime' data={PUO.createDateTime} />
                <Address title='Shipping Address' data={PUO.shippingAddress} />
                {!!PUO.fulfillDateTime && <DateTime title='fulfillDateTime' data={PUO.fulfillDatetime} />}
                {!PUO.fulfillDateTime && <DateTime title='requestDateTime' data={PUO.requestDatetime} approximate={true} />}
                
                <Dollar title='totalAmt' data={PUO.totalAmt} />
                
                <Status title='Status' data={PUO.status} {...getROStatusColor(PUO.status)} />
            </FieldsDiv>
            <PUODODocLines data={PUO.docLines} title={c.t('Pick Up Details')} /> 
        </Container>)
	}
}

export default PUODetailsForm


/*

docLines: Array [ {…} ]




*/