import React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'

export const Container = styled.div`
    padding: 2rem 0 0;
`

export default class Wizard extends React.Component {
	constructor(props) {
		super(props);
    }

	render () {
		return(
			<Container>
				<ProgressBar steps={this.props.totalSteps} currentStep={this.props.currentStep}/>
                {this.props.children}
			</Container>
		)
	}
}