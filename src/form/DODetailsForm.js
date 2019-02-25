import React from 'react'
import get from 'lodash/get'
import styled from "styled-components"

import { Container, ButtonsDiv, FieldsDiv, RecordID, DateOnly, DateTime, Text, Num, Dollar, Address, PUODODocLines, Status} from '../component/DocDetails.js'
import SystemError from '../component/SystemError.js'
import {getROStatusColor} from './ROListForm.js'

class DODetailsForm extends React.PureComponent {

	render() {
        const g = this.props.login
        const c = this.props.i18n
        const DO = this.props.DO
        if (!DO) return(<SystemError message='Delivery Order is not available' errorData={{DO: undefined}} />)

        let role = 'viewer'
        if (g.state.myself.accountOwn_id.find(v=>v._id===DO.account_id._id)) { role='owner'}
        if (g.state.myself.accountManage_id.find(v=>v._id===DO.account_id._id)) { role='manager'}

		return (<Container>
            <RecordID id={DO._id} docType='DeliveryOrder' />
            <ButtonsDiv>
                
            </ButtonsDiv>
            <FieldsDiv>
                <DateOnly title='createDateTime' data={DO.createDateTime} />
                <Address title='Shipping Address' data={DO.shippingAddress} />
                {!!DO.fulfillDateTime && <DateTime title='fulfillDateTime' data={DO.fulfillDatetime} />}
                {!DO.fulfillDateTime && <DateTime title='requestDateTime' data={DO.requestDatetime} approximate={true} />}
                
                <Dollar title='totalAmt' data={DO.totalAmt} />
                
                <Status title='Status' data={DO.status} {...getROStatusColor(DO.status)} />
            </FieldsDiv>
            <PUODODocLines data={DO.docLines} title={c.t('Delivery Details')} /> 
        </Container>)
	}
}

export default DODetailsForm