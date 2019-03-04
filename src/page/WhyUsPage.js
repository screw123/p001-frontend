import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'

import {BigLoadingScreen } from '../component/Loading.js'

class WhyUsPage extends React.Component {
    
    
    render = () => (
        <div>
            <BigLoadingScreen text={'Welcome to Wisekeep!  This page is Why Us!'}/>
        </div>
    )
}

export default WhyUsPage