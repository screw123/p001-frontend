import React from "react"
import { I18n } from 'react-i18next'

import QuotationForm from '../form/QuotationForm.js'


import Background from '../component/Background.js'

class QuotationPage extends React.Component {
    
    render() {
        return (
            <I18n>
            {(t, { i18n }) => (
                <Background>
                    
                    <QuotationForm account_id={"5b518c4c031c7d0179e23b6a"} user={{}} />
                </Background>
            )}
            </I18n>
        )
    }
}

export default QuotationPage