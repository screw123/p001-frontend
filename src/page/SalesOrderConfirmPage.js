import React from "react"
import { I18n } from 'react-i18next'

import SalesOrderConfirmForm from '../form/SalesOrderConfirmForm.js'


import Background from '../component/BasicComponents.js'

class SalesOrderConfirmPage extends React.Component {
    
    render() {
        return (
            <I18n>
            {(t, { i18n }) => (
                <Background>
                    
                    <SalesOrderConfirmForm quotation_id={"5b86135cb5a42c6478ca7258"} account_id={"5b518c4c031c7d0179e23b6a"}/>
                </Background>
            )}
            </I18n>
        )
    }
}

export default SalesOrderConfirmPage