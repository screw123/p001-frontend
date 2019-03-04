import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'

import {BigLoadingScreen } from '../component/Loading.js'

class IndexPage extends React.Component {
    
    
    render = () => (
        <div>
            <BigLoadingScreen text={'Welcome to Wisekeep!  Our website is under construction!'}/>
        </div>
    )
}

export default IndexPage