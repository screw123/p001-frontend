import React from "react"
import styled from 'styled-components'

const CheckboxContainer = styled.div`
	display: inline-block;
	vertical-align: middle;
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
	width: 32px;
	height: 32px;
	background: ${props => (props.checked ? '#E71E6E' : '#ccc')};
	border-radius: 3px;
	transition: all 150ms;

	${HiddenCheckbox}:focus + & {
		box-shadow: 0 0 0 3px pink;
	}

	${Icon} {
		visibility: ${props => (props.checked ? 'visible' : 'hidden')}
	}
`

const CheckBox = ({ 
	field: { name, ...field},
	form: {setFieldValue, ...form},
	className, checked, children, onChange, ...props }) => {

	const change = setFieldValue ? (e)=>setFieldValue(name, !checked) : onChange
	
	return (
		<CheckboxContainer className={className}>
			<HiddenCheckbox checked={checked} {...props} {...field} />
			<StyledCheckbox checked={checked} onClick={(e)=>change(e)}>
				<Icon viewBox="0 0 24 24">
					<polyline points="20 6 9 17 4 12" />
				</Icon>
			</StyledCheckbox>
			{children}
		</CheckboxContainer>
	)
}

export default CheckBox