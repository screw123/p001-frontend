import React from 'react'
import styled from 'styled-components'
import InfoList from '../component/InfoList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Tag} from '../component/BasicComponents.js'
import {ToolTip} from '../component/Tooltip.js'
import { Redirect } from "react-router-dom"

import { ApolloProvider, Mutation } from 'react-apollo'


import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

const AL = styled.div`
    box-sizing:border-box;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: [s1] 2.5% [checkbox] ${({multiSelect})=>multiSelect?'5':'0'}% [content] auto [button] 20% [end] 2.5% [s2];
    grid-column-gap: 0.2rem;
    overflow: visible;
`
const Left = styled.div`
    grid-column: content / button;
    overflow: visible;
`
const Right = styled.div`
    grid-column: button / end;
`
const Btn = styled.button`
    border: 2px solid grey; 
    padding: 5px 8px;
`

export default class AccountListForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={account_id: undefined, type: undefined}
        this.accountLineOwn = this.accountLineOwn.bind(this)
        this.accountLine = this.accountLine.bind(this)
        this.setRedirect = this.setRedirect.bind(this)
    }

    setRedirect = (acctId, type) => this.setState({account_id: acctId, type: type})

    accountLineOwn = x=> this.accountLine(x, [
        <Btn onClick={()=>this.setRedirect(x.data._id, 'View')}><FontAwesomeIcon icon={['fas', 'search']}/></Btn>
    ])

    accountLine = ({rowObj, data}, buttons) => {
        let { _id, name, accountType, balance, isActive} = data
    
        if (balance === 'undefined') { balance = 0 }
    
        return (
            <LocaleApiSubscriber>
            {(c)=>(
                <AL key={rowObj.key} style={rowObj.style}>
                    <Left>
                        <ToolTip mainText={name} tip={_id} />
                        <Tag float='right' background={(accountType==='PERSONAL')? 'LightGreen': 'RoyalBlue'}>{c.t(accountType)}</Tag>
                        <Tag>{balance}</Tag>
                        {!isActive && <Tag float='right' background='Gray'>{c.t('INACTIVE')}</Tag>}
                    </Left>
                    {buttons && <Right>{buttons}</Right>}
                </AL>
            )}
            </LocaleApiSubscriber>
        )
    }

    render() {
        const g = this.props.login
        const c = this.props.i18n
        let myself = g.state.myself
        
        if (this.state.redirect) {return(<Redirect push to={{pathname: '/editAccount/'+ this.state.type+'/'+this.state.account_id}} />)}

        return(<div>
            <InfoList 
                rowHeightCalc={()=>40}
                headerText={<div><FontAwesomeIcon icon={['far', 'address-card']}/> {c.t('My accounts')}</div>}
                data={myself.accountOwn_id || []} 
                listComponent={this.accountLineOwn}    
            />
            {myself.accountManage_id.length>0 && <InfoList 
                rowHeightCalc={()=>40}
                headerText={<div><FontAwesomeIcon icon={['far', 'address-card']}/> {c.t('Accounts you manage')}</div>}
                data={myself.accountManage_id || []}
                listComponent={this.accountLine}    
            />}
            {myself.accountView_id.length>0 && <InfoList 
                rowHeightCalc={()=>40}
                headerText={<div><FontAwesomeIcon icon={['far', 'address-card']}/> {c.t('Accounts you view')}</div>}
                data={myself.accountView_id || []}
                listComponent={this.accountLine}    
            />}
        </div>)
    }

}