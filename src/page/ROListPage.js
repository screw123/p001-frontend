import React from "react"
import styled from 'styled-components'
import ROListForm from '../form/ROListForm.js'
import {Background} from '../component/BasicComponents.js'
import { ApolloProvider, Query } from 'react-apollo'
import { getRecentROListByUser } from '../gql/query.js'
import parseApolloErr from '../util/parseErr.js'
import {BigLoadingScreen} from '../component/Loading.js'
import get from 'lodash/get'
import union from 'lodash/union'
import { MultiSelect } from '../component/FormikForm.js'

const ContainerBox = styled.div`
    background-color: white;
    border-radius: 16px;
    margin: 5% 10%;
`
/*
This let user select an account that he has access to, then download list of Rental Orders from API, provide that list to ROListForm.

Accounts shows as a dropdown menu if it has 3+ entries.  If it has < 3 entries it shows as a radio box.  This is the default behaviour of MultiSelect.

MultiSelect is the default component that we use thruout the app of a dropdown/radio box

For all pages/forms/components:
    "g" normally refers to GqlApi, which is a state container for everything related to backend API connection, login status, user information.

    "c" normally refers to LocaleApi, which keeps the translation component.  "c.t(string) is the translation function that turns the string into different language.

    For some lazy reason, c also stores the browser window size now.  Will move them to their own state container later.

*/


class ROListPage extends React.Component {

    constructor(props) {
        super(props)
        
        //consolidate accounts that user has access to, into a list store in state
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
        
        return (
            <ApolloProvider client={g.getGqlClient()}>
                <Query query={getRecentROListByUser} notifyOnNetworkStatusChange>
                {({ loading, error, data, refetch, networkStatus }) => {
					if (loading) return (<BigLoadingScreen text={'Loading...'}/>)
					if (error) {
						console.log('ROListPage', error)
						const errStack = parseApolloErr(error, c.t)

						return (
							<div>
								{errStack.map(v=>{ return <p>{v.message}</p> }) }
							</div>	
						)
                    }
                    return(
                        <ContainerBox>
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
                            {this.state.selectedAcct_id && 
                                <Background>
                                    <ROListForm 
                                        ROlist={data.getRecentROListByUser
                                            .filter(v=>v.account_id._id===this.state.selectedAcct_id)}
                                        {...this.props}
                                    />
                                </Background>
                            }
                        </ContainerBox>
                    )
                }}
                </Query>
            </ApolloProvider>
        )
    }
}

export default ROListPage