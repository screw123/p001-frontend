import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'

import {BigLoadingScreen } from '../component/Loading.js'

class PricingPage extends React.Component {
    
    
    render = () => (
        <div>
            <BigLoadingScreen text={'Welcome to Wisekeep!  This page is Pricing'}/>
        </div>
    )
}

export default PricingPage