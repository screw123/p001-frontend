import React from "react"
import { I18n } from 'react-i18next'

class IndexPage extends React.Component {
    
    
    render = () => (
        <I18n>
            {(t) => (
                <div>
                    <h1>{t('Welcome to P001!')}</h1>
                </div>
            )}
        </I18n>

    )
}

export default IndexPage