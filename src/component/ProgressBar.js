import React from 'react';
import styled from 'styled-components'

const BarContainer = styled.div`
    width: 100%;
    margin: 2rem auto;
`

const ProgressBar = styled.ul`
    counter-reset: step;
    display: flex;
    flex-wrap: nowrap;
    list-style: none;
    padding: 0;
`

const ProgressStep = styled.li`
    width: 20%;
    float: left;
    font-size: 12px;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    color: #BFBCBD;
    
    &:before {
        width: 25px;
        height: 25px;
        content: counter(step);
        counter-increment: step;
        line-height: 25px;
        border: 2px solid ##BFBCBD;
        display: block;
        text-align: center;
        margin: 0 auto 10px auto;
        border-radius: 50%;
        background-color: #BFBCBD;
    }

    &:after {
        width: 100%;
        height: 2px;
        content: '';
        position: absolute;
        background-color: #BFBCBD;
        top: 12px;
        left: -50%;
        z-index: -1;
    }

    &:first-child:after {
        content: none;
    }

    &.active {
        color: #E61D6E;
        &:before {
            background-color: #E61D6E;
            border-color: #E61D6E;
            box-shadow: 0 0 6px 0 rgba(230,29,110,0.53);
        }
    }

    // &.active + &:after {
    //     background-color: #E61D6E;
    // }
`

const ButtonNext = styled.button`
    position:relative;
    cursor: pointer;
    background-color: red;
    z-index: 10000;
`


export default class Progress extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        const steps = this.props.steps;
        const currentStep = this.props.currentStep;

        let renderSteps = (steps) => {
            let counter = 0;
            const stepsArray = [];

            for (let index = 0; index < steps; index++) {
                counter = index + 1;
                stepsArray.push(<ProgressStep className={counter === currentStep ? 'active' : ''} key={index}/>)
            }
            return stepsArray;
        };

        return (
            <BarContainer>
                <ProgressBar>
                    {renderSteps(steps)}
                </ProgressBar>

                <ButtonNext>HEllo!!!</ButtonNext>
            </BarContainer>
        )
    }
}
