import React from 'react'
import get from 'lodash/get'
import styled from "styled-components"

import { Container, ButtonsDiv, FieldsDiv, RecordID, DateOnly, DateTime, Text, Num, Dollar, Address, DocLines, Status} from '../component/DocDetails.js'
import SystemError from '../component/SystemError.js'
import {getROStatusColor} from './ROListForm.js'

/*{
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
}*/

class RODetailsForm extends React.PureComponent {

	render() {
        const g = this.props.login
        const c = this.props.i18n
        const RO = this.props.RO
        if (!RO) return(<SystemError message='Rental Order is not available' errorData={{RO: undefined}} />)

        let role = 'viewer'
        if (g.state.myself.accountOwn_id.find(v=>v._id===RO.account_id._id)) { role='owner'}
        if (g.state.myself.accountManage_id.find(v=>v._id===RO.account_id._id)) { role='manager'}

		return (<Container>
            <RecordID id={RO._id} docType='RentalOrder' />
            <ButtonsDiv>
                
            </ButtonsDiv>
            <FieldsDiv>
                <DateOnly title='createDateTime' data={RO.createDateTime} />
                <DateOnly title='updateDateTime' data={RO.updateDateTime} />
                <Dollar title='totalAmt' data={RO.totalAmt} />
                <Address title='billingAddress' data={RO.billingAddress} />
                <Status title='Status' data={RO.status} {...getROStatusColor(RO.status)} />
            </FieldsDiv>
            <DocLines data={RO.docLines} title='Rental Details' /> 
        </Container>)
	}
}

export default RODetailsForm