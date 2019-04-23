import React from 'react';
import styled from 'styled-components'

export const ControlContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Total = styled.h3`
    color: #E61D6E !important;
    font-size: 2rem;
    font-weight: bold;
`

export const Button = styled.button`
    background: none;
    border: none;
    height: 42px;

    &:focus {
        border: none;
        outline: none;
    }
`

export const ActionImage = styled.img`
    height: 42px !important;
    width: 42px;
`

export default class AddProductControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ControlContainer>
                <Button onClick={this.props.clickSubs}>
                    <ActionImage src="images/ico-subs.svg" alt="" />
                </Button>
                <Total>
                    {this.props.total}
                </Total>
                <Button onClick={this.props.clickAdd}>
                    <ActionImage src="images/ico-add.svg" alt="" />
                </Button>
            </ControlContainer>
        )
    }
}
