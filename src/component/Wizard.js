import React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'

export default class Wizard extends React.Component {
	constructor(props) {
		super(props);
    }

	render () {
		return(
			<div>
				<ProgressBar steps={this.props.totalSteps} currentStep={this.props.currentStep}/>
                {this.props.children}
			</div>
		)
	}
}