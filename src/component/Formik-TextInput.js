import React from 'react'
import styled from 'styled-components'

import { FieldDiv, FieldLabel, ErrorLabel } from './Formik-Basic.js'

const Input = styled.input`
    width: 100%;
    display: block;
    border: none;
    background: transparent;
    font-size: 1em;
    outline: none;
`

export const InputRow = styled.div`
    display: flex
    box-sizing:border-box;
    border-radius: 0.25em;
    border: ${props => props.disabled ? `0em` : `0.1em solid #999999`};
    background-color: rgba(255, 255, 255, 0.1);
    text-overflow: clip;
    padding: 0.5em;
    font-size: 1.1em;
`

export const InputGroup = styled.div`
    display: flex
    box-sizing:border-box;
    text-overflow: wrap;
    padding: 0.5em;`

export const TextField = ({
    field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
    form: { touched }, //also values, handleXXXX, dirty, isValid, status, etc.
    label, rightIcon, err, hidden, ignoreTouch, ...props }) => {
        
        if (hidden) return null
        else return (
            <FieldDiv>
                <FieldLabel {...props}>
                    {label}
                    <InputRow {...props}>
                        <Input
                            name={name}
                            placeholder={placeholder}
                            {...fields}
                            {...props}
                        />
                        {rightIcon && genRightIcon(rightIcon)}
                    </InputRow>
                </FieldLabel>
                {(ignoreTouch || touched[name]) && err && <ErrorLabel>{err}</ErrorLabel> }
            </FieldDiv>
        )
    }

const genRightIcon = (iconArr) => {
    let arr = []
    for(let i=0; i<iconArr.length; i++) {
        arr.push(iconArr[i])
    }
    return arr
}

export default { TextField }