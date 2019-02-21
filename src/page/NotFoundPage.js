import React from "react"
import { I18n } from 'react-i18next'

import {Background} from '../component/BasicComponents.js'

export class NotFoundPage extends React.Component {
    
    render() { return (
		<Background>
			<h1>{'Not Found'}</h1>
		</Background>
	)}
}

export default NotFoundPage