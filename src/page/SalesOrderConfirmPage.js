import React from "react"

import {Background} from '../component/BasicComponents.js'

import SalesOrderConfirmForm from '../form/SalesOrderConfirmForm.js'

class SalesOrderConfirmPage extends React.Component {
    
    render() {
        return (
            <Background>
                <SalesOrderConfirmForm {...this.props} />
            </Background>
        )
    }
}

export default SalesOrderConfirmPage