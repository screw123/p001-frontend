import React from "react"
import { I18n } from 'react-i18next'

import QuotationForm from '../form/QuotationForm.js'
import SalesOrderConfirmForm from '../form/SalesOrderConfirmForm.js'

import { MultiSelect } from '../component/FormikForm.js'
import Background from '../component/BasicComponents.js'

import GqlApi, {GqlApiSubscriber} from '../stateContainer/GqlApi.js'

import union from 'lodash/union'

class QuotationPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.changeAcct = this.changeAcct.bind(this)
        const acctList = union(
            (this.props.container.gqlapi.state.myself.accountOwn_id===null) ? 
                [] : 
                this.props.container.gqlapi.state.myself.accountOwn_id.map((v)=> {
                    return {value: v._id, label: v.name}
                }),
            (this.props.container.gqlapi.state.myself.accountManage_id===null) ? 
                [] :
                this.props.container.gqlapi.state.myself.accountManage_id.map((v)=> {
                    return {value: v._id, label: v.name}
                })
        )
        this.state = {
            selectedAcct: ((acctList.length>0) ? acctList[0].value : ''),
            acctList: acctList
        }
    }
    
    changeAcct(e, v) {
        this.setState({selectedAcct: v})
    }
    
    render() {
        return (
            <GqlApiSubscriber>
            {(c) => (
                <I18n>
                {(t, { i18n }) => (
                    <Background>
                        {!c.state.isLogined && 
                        <div>
                            <QuotationForm account_id='' />
                        </div> }
                        {c.state.isLogined && 
                            <div>
                                <MultiSelect 
                                    field={{
                                        name: 'acct',
                                        value: this.state.selectedAcct
                                    }}
                                    form={{
                                        setFieldValue: this.changeAcct
                                    }}
                                    multiSelect={false}
                                    label={t('Please choose your account')+':'}
                                    options={this.state.acctList}
                                />
                                <QuotationForm account_id={this.state.selectedAcct} />
                            </div>
                        }
                    </Background>
                )}
                </I18n>
            )}
            </GqlApiSubscriber>
        )
    }
}

export default QuotationPage


/*{c.checkLogined() &&  
    <DropDown field={{}} form={{}} valueList={
        union(
            (c.state.myself.accountOwn_id===null) ? 
                [] : 
                c.state.myself.accountOwn_id.map((v)=> {
                    return {value: v._id, name: v.name}
                }),
            (c.state.myself.accountManage_id===null) ? 
                [] :
                c.state.myself.accountManage_id.map((v)=> {
                    return {value: v._id, name: v.name}
                })
        )
    } onChange={(e)=>this.changeAcct(e)}/>
*/