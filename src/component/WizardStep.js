import React from 'react';

export default class OnboardingStep extends React.Component {
    render() {
        if (this.props.currentStep !== this.props.step) {
            return null
        }
        return (
            <React.Fragment>
                <div className="wizard-step">
                    <div className="step-body">
                        {this.props.children}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}