import React from 'react'
import styled from 'styled-components'
import InfoList from '../component/InfoList.js'

import {ToolTip} from '../component/Tooltip.js'

import { ApolloProvider, Mutation } from 'react-apollo'

const AL = styled.div`
    display: flex
`
const Left = styled.div`
    flex: 3
`
const Right = styled.div`
    flex: 1
`
const Btn = styled.button`
    border: 2px solid grey; 
    padding: 5px 8px;
`
const Item = styled.div`

`
const HD = styled.h2`

`
const TT = styled.h4`

`

const AccountBoxCount = (props) => {
    return (
        <TT>Box Info Loading...(pending to develop)</TT>
    )
}

const AccountLine = ({rowObj, data}) => {
    let { 
        _id, 
        name, 
        accountType,
        balance, 
        isActive,
        accessRight
    } = data

    if (typeof (balance) === 'undefined') 
        balance = 0

    let icons;
    if (accessRight=='Own') {
        icons =  (
            <Right>
                <Btn>Edit</Btn>
                <Btn>View</Btn>
                <Btn>Close</Btn>
            </Right>
        )
    }

    return (
        <AL>
            <Left>
                <ToolTip mainText={'Name: '} tip={_id} />
                
                <Item>AccontType: {accountType}</Item>
                <Item>Balance: {balance}</Item>
                <Item>Is Active: {isActive}</Item>
            </Left>
            {icons}
        </AL>
    )
}

export default class AccountListForm extends React.Component {

    render() {
        const g = this.props.login
        const c = this.props.i18n
        
        let myself = g.state.myself

        let propsData = {
            headerIconLeft: "Left Icon",
            headerText: "Header",
            headerIconRight: "Right Icon",
            width: '100%',
            height: 600,
            itemSize: 50
        }
        return(<div>
            <HD>Account Own Information</HD>
            <InfoList 
                headerText={c.t('Your accounts')}
                data={myself.accountOwn_id || []} 
                listComponent={AccountLine}    
            />
            <HD>Account Manage Information</HD>
            <InfoList 
                {...propsData} 
                data={myself.accountManage_id || []}
                listComponent={AccountLine}    
            />
            <HD>Account View Information</HD>
            <InfoList 
                {...propsData} 
                data={myself.accountView_id || []}
                listComponent={AccountLine}    
            />
        </div>)
    }

}