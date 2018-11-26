import React from "react"
import { I18n } from 'react-i18next'

import SalesOrderConfirmForm from '../form/SalesOrderConfirmForm.js'


import Background from '../component/BasicComponents.js'

class SalesOrderConfirmPage extends React.Component {
    
    render() {
        console.log('this.props.location.state', this.props)
        return (
            <Background>
                <SalesOrderConfirmForm quotation_id={"5b86135cb5a42c6478ca7258"} account_id={"5b518c4c031c7d0179e23b6a"} {...this.props} />
            </Background>
        )
    }
}

export default SalesOrderConfirmPage