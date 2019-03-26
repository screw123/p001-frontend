import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'

import SystemError from '../component/SystemError.js'
import ContainerDetailsForm from '../form/ContainerDetailsForm.js'
import get from 'lodash/get'


class ContainerDetailsPage extends React.Component {
    
    
    render = () => {
        let container = get(this.props.location, 'state.container', undefined) || (this.props.match? {_id: this.props.match.params.container_id}: undefined)
        return (
            <React.Fragment>
                {!container && 
                    <SystemError message='Container ID not found' errorData={{container: undefined}} />
                }
                <ContainerDetailsForm container={container} {...this.props} />
            </React.Fragment>
        )
    }
}

export default ContainerDetailsPage