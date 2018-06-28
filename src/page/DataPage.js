import React from "react"
import { I18n } from 'react-i18next'
import { Query } from 'react-apollo'
import { getMyAccount } from '../gql/query.js'
import Background from '../component/Background.js'
class DataPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loadData: false }
        this.loadData = this.loadData.bind(this)
      }
    
    

    loadData() {
        console.log('loadData=', this.state.loadData)
        this.setState({loadData: true})
        console.log('loadData=', this.state.loadData)
    }

    render() {
        const makePretty = (d) => {
            return(
                <div>
                    <h3>Your list of accounts:</h3>
                    <p><b>{d.name}</b>({d._id}) {d.isActive? "Active": "SUSPENDED"}<br />
                    Current Balance: {d.balance} <br />
                    <b>Default Billing Address</b><br />
                    {d.defaultBillingAddress_id.addressType}<br />
                    {d.defaultBillingAddress_id.legalName}<br />
                    {d.defaultBillingAddress_id.streepAddress}<br />
                    {d.defaultBillingAddress_id.addressRegion}<br />
                    {d.defaultBillingAddress_id.addressCountry}<br />
                    <b>Default Shipping Address</b>
                    {d.defaultShippingAddress_id.addressType}<br />
                    {d.defaultShippingAddress_id.legalName}<br />
                    {d.defaultShippingAddress_id.streepAddress}<br />
                    {d.defaultShippingAddress_id.addressRegion}<br />
                    {d.defaultShippingAddress_id.addressCountry}<br />
                    </p>
                </div>
            )
        }
        return (
            <Background>
                <Query query={getMyAccount}>
                    {({ client, loading, error, data, refetch }) => {
                        if (loading) return (<button onClick={() => {
                            this.loadData()
                            refetch()
                            }}>Load data after login</button>)

                        if (error) return (<p>Error :(<button onClick={() => {
                            this.loadData()
                            refetch()
                            }}>Load data after login</button></p>)

                        console.log('data=', data)
                        
                        if (data.getMyAccount.length==0) return (<button onClick={() => {
                            this.loadData()
                            refetch()
                            }}>Load data after login</button>)

                        return(
                            <div>
                            <button onClick={() => {
                                client.resetStore()
                                }}>Logout</button>
                            {data.getMyAccount.map((d)=> {
                                return makePretty(d)
                            })}
                            </div>
                        )
                    }}
                </Query>
            </Background>
        )
    }
}

export default DataPage