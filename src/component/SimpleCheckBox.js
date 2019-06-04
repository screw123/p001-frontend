import React from "react"
import styled from 'styled-components'

const CheckboxContainer = styled.div`
    align-items: center;
	display: flex;
    vertical-align: middle;
    
    label {
        color: #787F84;
        font-size: 1rem;
    }
`

const Icon = styled.svg`
	fill: none;
	stroke: white;
	stroke-width: 2px;
`
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
	border: 0;
	clip: rect(0 0 0 0);
	clippath: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`

const StyledCheckbox = styled.div`
	display: inline-block;
	width: 29px;
	height: 29px;
    background: ${props => (props.checked ? '#E71E6E' : 'transparent')};
    border: 2px solid #979797;;
    border-radius: 3px;
    margin-right: 1rem;
	transition: all 150ms;

	${HiddenCheckbox}:focus + & {
		box-shadow: 0 0 0 3px pink;
	}

	${Icon} {
		visibility: ${props => (props.checked ? 'visible' : 'hidden')}
	}
`

const SimpleCheckBox = (props) => {
    return (
		<CheckboxContainer className={props.className}>
			<HiddenCheckbox checked={props.isChecked} />
			<StyledCheckbox checked={props.isChecked} onClick={props.onChange} >
				<Icon viewBox="0 0 24 24">
					<polyline points="20 6 9 17 4 12" />
				</Icon>
			</StyledCheckbox>
            <label htmlFor="test1">
                {props.label}
                {props.isChecked}
            </label>
		</CheckboxContainer>
	)
}

export default SimpleCheckBox;