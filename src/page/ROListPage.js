import React from "react"

import ROListForm from '../form/ROListForm.js'

import {Background} from '../component/BasicComponents.js'

class ROListPage extends React.Component {
    
    render() {
        const g = this.props.login
        const c = this.props.i18n
        
        return (
            <Background>
                <h1>{c.t('Box Rental Record')}</h1>
                <ROListForm match={this.props.match} user={{}} />
            </Background>
        )
    }
}

export default ROListPage