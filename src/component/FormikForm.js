import React from 'react'
import { Form } from 'formik'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FormikForm = styled(Form)`
    padding: 1em;
    display: flex;
    box-sizing:border-box;
    flex-flow: row wrap;
    flex: 0 0 auto;
    
    @media (max-width: 480px) {
        width: 95%
    }
    
    @media (min-width: 481px) and (max-width: 768px) {
        width: 95%
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 95%
    }
    
    @media (min-width: 1025px) {
        width: 1024px
    }`

const Input = styled.input`
    width: ${({cols}) => cols ? Math.floor(100/cols) + `%` : `100%`};
    display: block;
    border: none;
    background: transparent;
    font-size: 1em;
    outline: none;
`

const ErrorLabel = styled.label`
    color: Red;
    display: block;
    font-size: 0.8em;
`

const FieldDiv = styled.div`
    display: block
    box-sizing:border-box;
    padding: 0.3em;
    
    @media (max-width: 480px) {
        width: 100%
    }
    
    @media (min-width: 481px) and (max-width: 768px) {
        width: 100%
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 50%
    }
    
    @media (min-width: 1025px) {
        width: 50%
    }
`

const FieldLabel = styled.label`
    display: block;
    text-transform: uppercase;
    font-size: 0.9em;
`

const InputRow = styled.div`
    display: flex
    box-sizing:border-box;
    border-radius: 0.25em;
    border: 0.13em solid #999999;
    background-color: rgba(255, 255, 255, 0.1);
    text-overflow: clip;
    padding: 0.5em;
`

const RBGroup = styled.div`
    border-radius: 0.25em;
    border: 0.13em solid #999999;
    background-color: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    display: inline-block;
    box-sizing:border-box;
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

export const TextField = ({
    field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
    form: { touched }, //also values, handleXXXX, dirty, isValid, status, etc.
    classNames, label, rightIcon, err, ...props }) => (
    <FieldDiv className={classNames}>
        <FieldLabel>
            {label}
            <InputRow>
                <Input
                    name={name}
                    placeholder={placeholder}
                    {...fields}
                    {...props}
                />
                {rightIcon && genRightIcon(rightIcon)}
            </InputRow>
        </FieldLabel>
        {touched[name] && err && <ErrorLabel>{err}</ErrorLabel> }
    </FieldDiv>
)

const genRightIcon = (iconArr) => {
    let arr = []
    for(let i=0; i<iconArr.length; i++) {
        arr.push(iconArr[i])
    }
    return arr
}

export const FB = styled.button`
    border: 2px solid ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `White`};
	display: flex;
	flex: 0 0 auto;
    align-self: stretch;
    font-size: 1em;
    font-weight: ${props => props.disabled ? `400` : `600`};
    color: ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `Black`};
    ${props => props.fullSize && `width: 100%`}
`

export const FormButton = ({children, ...props}) => (
    <FieldDiv>
        <FB {...props}>
            {children}
        </FB>
    </FieldDiv>
)

const FE = styled.label`
    color: Red;
    display: block;
    font-size: 1em;
`

export const FormErr = ({children, ...props}) => ( <FE {...props}>{children}</FE> )

const IconDiv = styled.div`
    align-self: center;
    padding: 0.15em;
    cursor: pointer;
`

export const FormIcon = ({onClick, ...props}) => (
    <IconDiv onClick={onClick}>
        <FontAwesomeIcon {...props}/>
    </IconDiv>
)

export const RadioButtonGroup = ({value, err, touched, label, className, children, name }) => (
    <div>
        <FieldLabel>{label}</FieldLabel>
        <RBGroup>
            {children}
        </RBGroup>
        {touched[name] && err && <ErrorLabel>{err}</ErrorLabel> }
    </div>
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

export const CheckBox = ({
    field: { name, value, ...fields },
    label, className, checked, ...props }) => {
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
            </FieldLabel>
        </div>
        
    )
}


export default FormikForm