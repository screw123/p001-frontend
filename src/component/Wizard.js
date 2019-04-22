import React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'

const totalSteps = 5;

export default class Wizard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1
		}

		this._next = this._next.bind(this);
		this._prev = this._prev.bind(this);
		this.test = this.test.bind(this);
	}

	_next() {
		console.log('here');
        let currentStep = this.state.currentStep;
        currentStep = currentStep >= totalSteps ? (totalSteps + 1) : (currentStep + 1);
        this.setState({
            currentStep: currentStep
        }, () => console.log(this.state))
    }

    _prev() {
		console.log('buu');
        let currentStep = this.state.currentStep;
        currentStep = currentStep <= 1 ? 1 : currentStep - 1;
        this.setState({
            currentStep: currentStep
        }, () => console.log(this.state))
	}
	
	previousButton() {
		console.log(this.state)
        let currentStep = this.state.currentStep;
        if (currentStep >= 2) {
            return (
                <button className="btn btn-outline-gray text-white px-5" type="button" onClick={this._prev}>Go back</button>
            )
        }
        if (currentStep === 1) {
            return (
                <button className="btn btn-outline-gray disabled px-5" type="button" onClick={this._prev}>Go back</button>
            )
        }
        return null
	}

	nextButton() {
		console.log(this.state)
        let currentStep = this.state.currentStep;
        if (currentStep < totalSteps) {
            return (
                <button className="btn btn-primary px-5" type="button" onClick={this._next}>Next</button>
            )
        }
        if (currentStep <= (totalSteps + 1)) {
            return (
                <button className="btn btn-primary px-5" type="button">
                    <a className="text-gray d-block w-100" href="/createAccount">Next</a>
                </button>
            )
        }
        return null
	}
	
	test() {
		console.log('here!!!!');
	}

	render () {
		return(
			<div>
				<ProgressBar steps={this.props.totalSteps} currentStep={this.state.currentStep}/>
			</div>
		)
	}
}