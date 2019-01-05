import React from 'react'
import styled from 'styled-components'
import InfoList, {InfoListStandardLine} from '../component/InfoList.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Tag, ToolTip} from '../component/BasicComponents.js'
import { Redirect } from "react-router-dom"

import { ApolloProvider, Mutation } from 'react-apollo'


import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

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
                <InfoListStandardLine
                    key={rowObj.key}
                    style={rowObj.style}
                    contentOnClick={e=>{
                        e.preventDefault()
                        this.setRedirect(_id, 'view')
                    }}
                    content={<div>
                        <span>{name}</span>
                        <Tag background={(accountType==='PERSONAL')? 'LightGreen': 'RoyalBlue'}>{c.t(accountType)}</Tag>
                        {!isActive && <Tag float='right' background='Gray'>{c.t('INACTIVE')}</Tag>}
                    </div>}
                />
            )}
            </LocaleApiSubscriber>
        )
    }

    accountLineEdit = ({rowObj, data}, buttons) => {
        let { _id, name, accountType, balance, isActive} = data
    
        return (
            <LocaleApiSubscriber>
            {(c)=>(
                <InfoListStandardLine
                    key={rowObj.key}
                    style={rowObj.style}
                    contentOnClick={e=>{
                        e.preventDefault()
                        this.setRedirect(_id, 'edit')
                    }}
                    content={<div >
                        <span>{name}</span>
                        <Tag background={(accountType==='PERSONAL')? 'LightGreen': 'RoyalBlue'}>{c.t(accountType)}</Tag>
                        {!isActive && <Tag float='right' background='Gray'>{c.t('INACTIVE')}</Tag>}
                    </div>}
                />
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