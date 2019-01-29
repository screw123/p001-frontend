import React from "react"

import QuotationForm from '../form/QuotationForm.js'

import { MultiSelect } from '../component/FormikForm.js'
import {Background} from '../component/BasicComponents.js'
import { Redirect } from "react-router-dom"

import union from 'lodash/union'

class QuotationPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.changeAcct = this.changeAcct.bind(this)
        this.quotationCreated = this.quotationCreated.bind(this)
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
            acctList: acctList,
            quotation: undefined
        }
    }
    
    changeAcct(e, v) {
        this.setState({selectedAcct: v})
    }
    
    quotationCreated = (q) => this.setState({quotation: q})

    render() {
        const g = this.props.login
        const c = this.props.i18n
        return (                                                                                      
            <Background>
                {/* if not logined, show QuoationForm with empty account_id */}
                {/* else, show a selector and account_id */}
                {g.state.isLogined && (this.state.acctList.length > 1) &&
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
                {!this.state.quotation && <QuotationForm account_id={this.state.selectedAcct} onAddQuotationSuccess={this.quotationCreated} {...this.props} /> }
                {this.state.quotation &&
                    <Redirect push to={{
                        pathname: '/confirmSalesOrder',
                        state: { quotation: this.state.quotation }
                    }} />
                }
            </Background>
        )
    }
}

export default QuotationPage
