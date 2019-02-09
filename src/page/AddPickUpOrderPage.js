import React from "react"

import { getAccountById, addPickUpOrderDraft } from '../gql/query.js'

import {Background} from '../component/BasicComponents.js'
import {BigLoadingScreen} from '../component/Loading.js'
import parseApolloErr from '../util/parseErr.js'
import { ApolloProvider, Query } from 'react-apollo'

import AddPickUpOrderForm from '../form/AddPickUpOrderForm.js'

import get from 'lodash/get'
import union from 'lodash/union'
import { MultiSelect } from '../component/FormikForm.js'

/*
This accepts:
[RO]: if RO is passed, will check and add all containers that are empty
[RO_id]: get RO from backend, then will check and add all containers that are empty
[container]: specifically add these containers to PUO, allow both empty or pre-occupied containers
[container_id]: specifically add these containers to PUO, allow both empty or pre-occupied containers
if all above not provided, will let users add to a blank PickUpOrder

account / account_id

*/

class AddPickUpOrderPage extends React.Component {
	
	constructor(props) {
		super(props)
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
		this.state={
			acctList: acctList,
			selectedAcct_id: get(this.props, 'location.state.account._id', undefined) || get(this.props, 'account._id', undefined) || this.props.account_id || ((acctList.length>0) ? acctList[0].value : undefined)
		}
		this.changeAcct = this.changeAcct.bind(this)
	}

	changeAcct = (e, v) =>  this.setState({selectedAcct_id: v})

    render() { 
        const g = this.props.login
		const c = this.props.i18n

		return(
			<Background>
                {/* if not logined, show QuoationForm with empty account_id */}
                {/* else, show a selector and account_id */}
                {g.state.isLogined && 
                    <MultiSelect 
                        field={{
                            name: 'acct',
                            value: this.state.selectedAcct_id
                        }}
                        form={{
                            setFieldValue: this.changeAcct
                        }}
                        multiSelect={false}
                        label={c.t('Please choose your account')+':'}
                        options={this.state.acctList}
                    />
                }
                {this.state.selectedAcct_id && <AddPickUpOrderForm account_id={this.state.selectedAcct_id} {...this.props} />}
            </Background>
		)
	}
}

export default AddPickUpOrderPage