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
            (this.props.login.state.myself.accountOwn_id===null) ? 
                [] : 
                this.props.login.state.myself.accountOwn_id.map((v)=> {
                    return {value: v._id, label: v.name}
                }),
            (this.props.login.state.myself.accountManage_id===null) ? 
                [] :
                this.props.login.state.myself.accountManage_id.map((v)=> {
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
        const g = this.props.login
        const c = this.props.i18n
        return (                                                                                      
            <Background>
                {/* if not logined, show QuoationForm without empty account_id */}
                {/* else, show a selector and account_id */}
                {c.state.isLogined && (this.state.acctList.length > 1) &&
                    <MultiSelect 
                        field={{
                            name: 'acct',
                            value: this.state.selectedAcct
                        }}
                        form={{
                            setFieldValue: this.changeAcct
                        }}
                        multiSelect={false}
                        label={c.t('Please choose your account')+':'}
                        options={this.state.acctList}
                    />
                }
                <QuotationForm account_id={this.state.selectedAcct} {...this.props} />
            </Background>
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