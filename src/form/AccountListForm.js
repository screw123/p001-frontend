import React from 'react'
import styled from 'styled-components'
import InfoList from '../component/InfoList.js'

import GqlApi, { GqlApiSubscriber } from '../stateContainer/GqlApi.js'
import { ApolloProvider, Mutation } from 'react-apollo'
import { I18n } from 'react-i18next'

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
const Item = styled.p`

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

const AccountLine = (props) => {
    let { 
        _id, 
        name, 
        accountType,
        balance, 
        isActive, 
        accessRight
    } = props

    if (typeof (balance) == 'undefined') 
        balance = ""

    let icons;
    if (accessRight=='Own') {
        icons =  (
            <Right>
                <Btn>Edit</Btn>
                <Btn>View</Btn>
                <Btn>Close</Btn>
            </Right>
        )
    } else {
        icons =  (
            <Right>
                <Btn>View</Btn>
            </Right>
        )
    }

    return (
        <AL>
            <Left>
                <Item>Id: {_id}</Item>
                <Item>Name: {name}</Item>
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
        return(
            <ApolloProvider client={GqlApi.getGqlClient()}> 
                <I18n>
                {(t) => (
                    <GqlApiSubscriber>
                    {(c) => {
                        let myself = c.state.myself
                        let propsData = {
                            headerIconLeft: "Left Icon",
                            headerText: "Header",
                            headerIconRight: "Right Icon",
                            width: '100%',
                            height: 600,
                            itemSize: 50
                        }
                        (
                            <HD>Account Own Information</HD>
                            <InfoList 
                                {...propsData} 
                                data={myself.accountOwn_id} 
                                renderComponent={AccountLine}    
                            />
                            <HD>Account Manage Information</HD>
                            <InfoList 
                                {...propsData} 
                                data={myself.accountManage_id}
                                renderComponent={AccountLine}    
                            />
                            <HD>Account View Information</HD>
                            <InfoList 
                                {...propsData} 
                                data={myself.accountView_id}
                                renderComponent={AccountLine}    
                            />
                        )
                    }}
                    </GqlApiSubscriber>
                )}
                </I18n>
        </ApolloProvider>
        )
    }

}