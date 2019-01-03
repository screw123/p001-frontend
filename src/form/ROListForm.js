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
    grid-column: content / button;
    overflow: visible;
    cursor: pointer;
`


export default class ROListForm extends React.Component {

    constructor(props) {
        super(props)
        this.state={account_id: undefined, type: undefined}
        this.accountLine = this.accountLine.bind(this)
        this.setRedirect = this.setRedirect.bind(this)
    }

    setRedirect = (acctId, type) => this.setState({account_id: acctId, type: type})

    ROLine = ({rowObj, data}, buttons) => {
        let { _id, name, accountType, balance, isActive} = data
    
        if (balance === 'undefined') { balance = 0 }
    
        return (
            <LocaleApiSubscriber>
            {(c)=>(
                <AL key={rowObj.key} style={rowObj.style}>
                    <Row onClick={e=>{
                        e.preventDefault()
                        this.setRedirect(_id, 'view')
                    }}>
                        <span>{name}</span>
                        <Tag background={(accountType==='PERSONAL')? 'LightGreen': 'RoyalBlue'}>{c.t(accountType)}</Tag>
                        {!isActive && <Tag float='right' background='Gray'>{c.t('INACTIVE')}</Tag>}
                    </Row>
                </AL>
            )}
            </LocaleApiSubscriber>
        )
    }

    render() {
        const g = this.props.login
        const c = this.props.i18n
        let myself = g.state.myself
        
        if (this.state.account_id) {return(<Redirect push to={{pathname: '/viewRO/'+ this.state.RO_id}} />)}

        return(<div>
            <InfoList 
                rowHeightCalc={()=>40}
                headerText={<div><FontAwesomeIcon icon={['far', 'address-card']}/> {c.t('My Accounts')}</div>}
                data={myself.accountOwn_id || []} 
                listComponent={this.accountLine}
            />
            
        </div>)
    }

}