import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import {
	Header
} from "../component/HeaderStyles"

import PricingTable from '../component/PricingTable.js'


class PricingPage extends React.Component {
    
    
    render = () => (
        <React.Fragment>
            <Header Pricing>
				Pricing
            </Header>
            <PricingTable/>							
        </React.Fragment>
    )
}

export default PricingPage