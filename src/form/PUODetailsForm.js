import React from 'react'
import get from 'lodash/get'
import styled from "styled-components"

import { Container, ButtonsDiv, FieldsDiv, RecordID, DateOnly, DateTime, Text, Num, Dollar, Address, DocLines, Status} from '../component/DocDetails.js'
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
                <DateOnly title='updateDateTime' data={PUO.updateDateTime} />
                <Dollar title='totalAmt' data={PUO.totalAmt} />
                <Address title='billingAddress' data={PUO.billingAddress} />
                <Status title='Status' data={PUO.status} {...getROStatusColor(PUO.status)} />
            </FieldsDiv>
            <DocLines data={PUO.docLines} title='Pick Up Details' /> 
        </Container>)
	}
}

export default PUODetailsForm