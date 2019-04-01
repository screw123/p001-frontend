import React from 'react'
import styled from 'styled-components'

import { FieldDiv, FieldLabel, ErrorLabel } from './Formik-Basic.js'

const Input = styled.input`
	width: 100%;
	display: block;
	border: none;
	background: transparent;
	font-size: 1rem;
	outline: none;
`

export const InputRow = styled.div`
    display: flex
    box-sizing:border-box;
    border-radius: 2rem;
    //border: ${props => (props.disabled ? `0` : `0.1rem solid #999999`)};
    background: #F4F4F4;
    text-overflow: clip;
    padding: 0.8rem;
    font-size: 1rem;
`

export const InputGroup = styled.div`
    display: flex
    box-sizing:border-box;
    text-overflow: wrap;
    padding: 0.5em;`

const Remark = styled(ErrorLabel)`
	color: #888;
`


export const TextField = ({
	field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
	form: { touched }, //also values, handleXXXX, dirty, isValid, status, etc.
	label,
	remark,
	rightIcon,
	err,
	hidden,
	ignoreTouch,
	...props
}) => {
	if (hidden) return null
	else
		return (
			<FieldDiv>
				{/*<FieldLabel {...props}>*/}
					{/*label*/}
					<InputRow {...props}>
						<Input name={name} placeholder={label + ' ' + placeholder||''} {...fields} {...props} />
						{rightIcon && genRightIcon(rightIcon)}
					</InputRow>
					{remark && <Remark>{remark}</Remark>}
				{/*</FieldLabel>*/}
				{(ignoreTouch || touched[name]) && err && <ErrorLabel>{err}</ErrorLabel>}
			</FieldDiv>
		)
}

const genRightIcon = iconArr => {
	let arr = []
	for (let i = 0; i < iconArr.length; i++) {
		arr.push(iconArr[i])
	}
	return arr
}

export default { TextField }
