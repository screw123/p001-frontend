import React from 'react'
import styled from 'styled-components'
import InfoList from '../component/InfoList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Tag, ToolTip} from '../component/BasicComponents.js'
import { Redirect } from "react-router-dom"

import { ApolloProvider, Mutation } from 'react-apollo'


import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

const AL = styled.div`
    box-sizing:border-box;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: [s1] 2.5% [checkbox] ${({multiSelect})=>multiSelect?'5':'0'}% [content] auto [end] 2.5% [s2];
    grid-column-gap: 0.2rem;
    overflow: visible;
`
const Row = styled.div`
    grid-column: content / end;
    overflow: visible;
`

const Content = styled.div`
    cursor: pointer;
    display: inline-block
`


export default class AccountListForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={account_id: undefined, type: undefined}
        this.accountLineView = this.accountLineView.bind(this)
        this.accountLineEdit = this.accountLineEdit.bind(this)
        this.setRedirect = this.setRedirect.bind(this)
    }

    setRedirect = (acctId, type) => this.setState({account_id: acctId, type: type})

    accountLineView = ({rowObj, data}, buttons) => {
        let { _id, name, accountType, balance, isActive} = data
    
        return (
            <LocaleApiSubscriber>
            {(c)=>(
                <AL key={rowObj.key} style={rowObj.style}>
                    <Row><Content onClick={e=>{
                        e.preventDefault()
                        this.setRedirect(_id, 'view')
                    }}>
                        <span>{name}</span>
                        <Tag background={(accountType==='PERSONAL')? 'LightGreen': 'RoyalBlue'}>{c.t(accountType)}</Tag>
                        {!isActive && <Tag float='right' background='Gray'>{c.t('INACTIVE')}</Tag>}
                    </Content></Row>
                </AL>
            )}
            </LocaleApiSubscriber>
        )
    }

    accountLineEdit = ({rowObj, data}, buttons) => {
        let { _id, name, accountType, balance, isActive} = data
    
        return (
            <LocaleApiSubscriber>
            {(c)=>(
                <AL key={rowObj.key} style={rowObj.style}>
                    <Row><Content onClick={e=>{
                        e.preventDefault()
                        this.setRedirect(_id, 'view')
                    }}>
                        <span>{name}</span>
                        <Tag background={(accountType==='PERSONAL')? 'LightGreen': 'RoyalBlue'}>{c.t(accountType)}</Tag>
                        {!isActive && <Tag float='right' background='Gray'>{c.t('INACTIVE')}</Tag>}
                    </Content></Row>
                </AL>
            )}
            </LocaleApiSubscriber>
        )
    }

    render() {
        const g = this.props.login
        const c = this.props.i18n
        let myself = g.state.myself
        
        if (this.state.account_id) {return(<Redirect push to={{pathname: '/editAccount/'+ this.state.account_id+'/'+this.state.type}} />)}

        return(<div>
            <InfoList 
                rowHeightCalc={()=>40}
                headerText={<div><FontAwesomeIcon icon={['far', 'address-card']}/> {c.t('My Accounts')}</div>}
                data={myself.accountOwn_id || []} 
                listComponent={this.accountLineEdit}    
            />
            {myself.accountManage_id.length>0 && <InfoList 
                rowHeightCalc={()=>40}
                headerText={<div><FontAwesomeIcon icon={['far', 'address-card']}/> {c.t('Managed Accounts')}</div>}
                data={myself.accountManage_id || []}
                listComponent={this.accountLineEdit}    
            />}
            {myself.accountView_id.length>0 && <InfoList 
                rowHeightCalc={()=>40}
                headerText={<div><FontAwesomeIcon icon={['far', 'address-card']}/> {c.t('View Only Accounts')}</div>}
                data={myself.accountView_id || []}
                listComponent={this.accountLineView}    
            />}
        </div>)
    }

}