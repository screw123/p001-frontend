import React from 'react'
import { Form } from 'formik'
import styled from 'styled-components'

import {FieldDiv, FieldRow, FieldLabel, ErrorLabel, FormErr, FormIcon, FormButton, FormTag } from './Formik-Basic.js'


export { FieldDiv, FieldRow, FieldLabel, ErrorLabel, FormErr, FormIcon, FormButton, FormTag } from './Formik-Basic.js'
export { TextField } from './Formik-TextInput.js'
export { MultiSelect } from './Formik-MultiSelect.js'

const FormikForm = styled(Form)`
    display: flex;
    box-sizing:border-box;
    justify-content: space-between;
    flex-flow: row wrap;
    flex: 0 0 auto;
    
    @media (max-width: 480px) {
        width: 95%
    }
    
    @media (min-width: 481px) and (max-width: 768px) {
        width: 95%
    }
    
    @media (min-width: 769px) and (max-width: 1366px) {
        width: 95%
    }
    
    @media (min-width: 1367px) {
        width: 1366px
        margin: auto
    }`
    
    
const RBGroup = styled.div`
    box-sizing:border-box;
    border-radius: 0.25em;
    border: 0.1em solid #999999;
    background-color: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    display: inline-block;
    box-sizing:border-box;
    width: 100%
`

const RBDiv = styled(FieldDiv)`
    
`

const RB = styled.div`
    box-sizing:border-box;
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
    ${props => (props.checked)? `background: rgba(255, 255, 255, 0.7);
        transition: all 0.2s ease-out;`:''}
`


export const RadioButtonGroup = ({value, err, touched, label, className, children, name }) => (
    <RBDiv>
        <FieldLabel>{label}</FieldLabel>
        <RBGroup>
            {children}
        </RBGroup>
        {touched[name] && err && <ErrorLabel>{err}</ErrorLabel> }
    </RBDiv>
)

export const RadioButton = ({
    field: { name, value, ...fields },
    label, className, checked, ...props }) => {
    return (
    <RB>
        <RBLabel checked={checked}>
            {label}
            <RBInput
                name={name}
                type="radio"
                value={value} 
                checked={checked}
                {...fields}
                {...props}
            />
        </RBLabel>
    </RB>
)}

const CB = styled.input`

`

export const CheckBox2 = ({
    field: { name, value, ...fields },
    form: { touched },
    label, className, checked, err, children, ...props }) => {
    return (
        <div>
            <FieldLabel>
                <CB
                    name={name}
                    type="checkbox"
                    value={value} 
                    checked={checked}
                    {...fields}
                    {...props}
                />
                {label}
                {children}
            </FieldLabel>
            
            {touched[name] && err && <ErrorLabel>{err}</ErrorLabel> }
        </div>
        
    )
}

export const CheckBox = ({
    field: { name, value, ...fields },
    form: { touched, setFieldValue },
    label, className, checked, err, children, ...props }) => {
    return (
        <div>
            <FieldLabel>
                <CB
                    name={name}
                    type="checkbox"
                    value={value} 
                    checked={checked}
                    onClick={()=>{
                        console.log('setFieldValue=', setFieldValue, name, !checked)
                        setFieldValue(name, !checked)
                    }}
                    {...fields}
                    {...props}
                />
                {label}
                {children}
            </FieldLabel>
            
            {touched[name] && err && <ErrorLabel>{err}</ErrorLabel> }
        </div>
        
    )
}

export const DropDown = ({
    field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
    form: { touched }, //also values, handleXXXX, dirty, isValid, status, etc.
    valueList, classNames, label, rightIcon, err, hidden, ...props }) => {
    return (
        <select {...props}>
            {valueList.map(v=>DD(v.value, v.name))}
        </select>
    )
}

const DD = (value, name) => {
    return (<option value={value} key={value}>{name}</option>)
}

export default FormikForm 