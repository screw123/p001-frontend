import React from "react"

import {Background} from '../component/BasicComponents.js'

import SalesOrderConfirmForm from '../form/SalesOrderConfirmForm.js'
import { Redirect } from "react-router-dom"

class SalesOrderConfirmPage extends React.Component {
    
    constructor(props) {
        super(props)

        this.redirectToThankYou = this.redirectToThankYou.bind(this)
        this.state= {
            redirectToThankYou: false,
			order_id: undefined
        }
    }

    redirectToThankYou = (order) => { this.setState({ redirectToThankYou: true, order_id: order._id }) }

    render() {
        if (this.state.redirectToThankYou) {
            return(<Redirect to={{pathname: '/ThankYou', state: {order_id: this.state.order_id, orderType: 'Rental Order'}}} />)
        }
        return (
            <Background>
                <SalesOrderConfirmForm onConfirmSuccess={this.redirectToThankYou} {...this.props} />
            </Background>
        )
    }
}

export default SalesOrderConfirmPage