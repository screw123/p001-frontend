import React from 'react'
import { Form } from 'formik'
import styled from 'styled-components'

import {
	FieldDiv,
	FieldRow,
	FieldLabel,
	ErrorLabel,
	FormErr,
	FormIcon,
	FormButton,
	FormTag
} from './Formik-Basic.js'

export {
	FieldDiv,
	FieldRow,
	FieldLabel,
	ErrorLabel,
	FormErr,
	FormIcon,
	FormButton,
	FormButtonBasic,
	FormTag
} from './Formik-Basic.js'
export { TextField } from './Formik-TextInput.js'
export { MultiSelect } from './Formik-MultiSelect.js'

const FormikForm = styled(Form)`
	display: flex;
	box-sizing: border-box;
	// justify-content: space-between;
	flex-flow: column wrap;
	flex: 0 0 auto;

	// @media (max-width: 480px) {
	// 	width: 95%;
	// }

	// @media (min-width: 481px) and (max-width: 768px) {
	// 	width: 95%;
	// }

	// @media (min-width: 769px) and (max-width: 1366px) {
	// 	width: 95%;
	// }

	// @media (min-width: 1367px) {
	// 	width: 1366px
	// 	margin: auto
	// }

	//New
	width: 100%;

	.select-container {
		background-color: #F3F3F3;
		border-radius: 2rem;
		margin: 1rem 0;
		padding: 0.8rem;
	}

	.custom-select {
		background-image: url(/images/down-arrow-wise.svg);
		background-repeat: no-repeat;
		background-position: center right;
		box-sizing: border-box;
		border: none;
		color: #777;
		display: flex;
		font-weight: normal;
		height: 34px;
		text-overflow: clip;
		font-size: 1rem;
		width: 100%;
		-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;

		&:focus {
			border: none;
			outline: none;
		}
		
		&::-ms-expand { 
			display: none; /* remove default arrow in IE 10 and 11 */
		}
		
		/* target Internet Explorer 9 to undo the custom arrow */
		@media screen and (min-width:0\0) {
			background:none\9;
			padding: 5px\9;
		}
	}
`

const RBGroup = styled.div`
	box-sizing: border-box;
	border-radius: 0.25em;
	border: 0.1em solid #999999;
	background-color: rgba(255, 255, 255, 0.1);
	overflow: hidden;
	display: inline-block;
	box-sizing: border-box;
	width: 100%;
`

const RBDiv = styled(FieldDiv)``

const RB = styled.div`
	box-sizing: border-box;
	padding: 0.5em;
	display: inline-block;
	overflow: hidden;
`

const RBInput = styled.input`
	border: none;
	background: transparent;
	outline: none;
	visibility: hidden;
	display: none;
`

const RBLabel = styled.label`
	display: inline-block;
	font-size: 1em;
	background: transparent;
	width: 5em;
	cursor: pointer;
	${props =>
		props.checked
			? `background: rgba(255, 255, 255, 0.7);
        transition: all 0.2s ease-out;`
			: ''}
`

export const RadioButtonGroup = ({ value, err, touched, label, className, children, name }) => (
	<RBDiv>
		<FieldLabel>{label}</FieldLabel>
		<RBGroup>{children}</RBGroup>
		{touched[name] && err && <ErrorLabel>{err}</ErrorLabel>}
	</RBDiv>
)

export const RadioButton = ({
	field: { name, value, ...fields },
	label,
	className,
	checked,
	...props
}) => {
	return (
		<RB>
			<RBLabel checked={checked}>
				{label}
				<RBInput
					name={name}
					type='radio'
					value={value}
					checked={checked}
					{...fields}
					{...props}
				/>
			</RBLabel>
		</RB>
	)
}

const CB = styled.input``

export const CheckBox2 = ({
	field: { name, value, ...fields },
	form: { touched },
	label,
	className,
	checked,
	err,
	children,
	...props
}) => {
	return (
		<div>
			<FieldLabel>
				<CB
					name={name}
					type='checkbox'
					value={value}
					checked={checked}
					{...fields}
					{...props}
				/>
				{label}
				{children}
			</FieldLabel>

			{touched[name] && err && <ErrorLabel>{err}</ErrorLabel>}
		</div>
	)
}

export const CheckBox = ({
	field: { name, value, ...fields },
	form: { touched, setFieldValue },
	label,
	className,
	checked,
	err,
	children,
	...props
}) => {
	return (
		<div>
			<FieldLabel>
				<CB
					name={name}
					type='checkbox'
					value={value}
					checked={checked}
					onClick={() => {
						console.log('setFieldValue=', setFieldValue, name, !checked)
						setFieldValue(name, !checked)
					}}
					{...fields}
					{...props}
				/>
				{label}
				{children}
			</FieldLabel>

			{touched[name] && err && <ErrorLabel>{err}</ErrorLabel>}
		</div>
	)
}

export const DropDown = ({
	field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
	form: { touched }, //also values, handleXXXX, dirty, isValid, status, etc.
	valueList,
	classNames,
	label,
	rightIcon,
	err,
	hidden,
	change,
	...props
}) => {
	return 	(
		<div className="select-container">
			<select {...props} className="custom-select">
				{valueList.map(v => DD(v.value, v.name))}
			</select>
		</div>
	)
}

const DD = (value, name) => {
	return (
		<option value={value} key={value}>
			{name}
		</option>
	)
}

export default FormikForm
