import React from 'react'
import { Form } from 'formik'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select, { components } from 'react-select'

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

const Input = styled.input`
    width: ${({cols}) => cols ? Math.floor(100/cols) + `%` : `100%`};
    display: block;
    border: none;
    background: transparent;
    font-size: 1em;
    outline: none;
`

const ErrorLabel = styled.div`
    color: Red;
    display: block;
    font-size: 0.8em;
`

export const FieldDiv = styled.div`
    display: block
    box-sizing:border-box;
    padding: 1em;
    min-width: 220px;
    
    @media (max-width: 480px) {
        width: 100%
    }
    
    @media (min-width: 481px) and (max-width: 768px) {
        width: 100%
    }
    
    @media (min-width: 769px) and (max-width: 1024px) {
        width: 48%;
    }
    
    @media (min-width: 1025px) {
        width: 48%;
    }
`

export const FieldRow = styled(FieldDiv)`
    display: flex
    width: 100%
    box-sizing:border-box;
    padding: 1em;
    flex-flow: row wrap;
`

const FieldLabel = styled.label`
    display: block;
    text-transform: uppercase;
    font-size: 0.9em;
`

export const InputRow = styled.div`
    display: flex
    box-sizing:border-box;
    border-radius: 0.25em;
    border: 0.1em solid #999999;
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
    classNames, label, rightIcon, err, hidden, ...props }) => {
        
        if (hidden) return null
        else return (
            (!hidden) && <FieldDiv className={classNames}>
                <FieldLabel {...props}>
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
    }


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
    <FB {...props}>
        {children}
    </FB>
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

export const CheckBox = ({
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


const RadioBlockGroup = styled.div`
    box-sizing:border-box;
    display: flex;
    flex-flow: row wrap;
    box-sizing:border-box;
    width: 100%
`

const RadioBlock = styled.div`
    border: 0.1em solid #999999;
    border-radius: 0.25em;
    display: block;
    margin: 0.25em;
    padding: 0.5em;
    cursor: pointer;
    width: 10em;
    min-width: 10em;
    ${({selected}) => selected? `background-color: rgba(255, 255, 255, 0.8);` : ``}
`

const updateSelect = ({setFieldValue, name, currentValue, value, multiSelect}) => {
    if (multiSelect) {
        if (currentValue.includes(value)) {
            setFieldValue(name, currentValue.filter(v => value !== v))
        }
        else {
            setFieldValue(name, currentValue.concat([value]))
        }
    }
    else { setFieldValue(name, value) }
}

const CustomSelectContainer = ({ children, ...props }) => { return (
    <components.SelectContainer {...props}>
        {children}
    </components.SelectContainer>
)}
const StyledSelectContainer= styled(CustomSelectContainer)`
    cursor: pointer;
`

export const MultiSelect = ({
    field: { name, value, ...fields },
    form: { touched, errors, setFieldValue },
    classNames, options, defaultValue, disabled, label, multiSelect, isLoading, hidden, ...props }) => {
    /*  Radio by default, will change to select if options > 3
        if multi-select, will change radio to checkbox
        field.name = internal name used by code
        label = text label shown on form
        defaultValue = value or [value]
        options = [{value, label}]  */
    
    if (hidden) return null
    else if (options.length>3) { 
        return (
        <FieldDiv className={classNames}>
            <FieldLabel>{label}</FieldLabel>
            <Select
                components={{ 
                    SelectContainer: StyledSelectContainer
                }}
                name={name}
                value={value}
                defaultValue={defaultValue}
                isDisabled={disabled}
                isLoading={isLoading}
                isSearchable={true}
                options={options}
                {...fields}
            />
            {touched[name] && errors[name] && <ErrorLabel>{errors[name]}</ErrorLabel> }
        </FieldDiv>
    )}
    
    else { 
        let items = []
        for(let i=0; i<options.length;i++) {
            
            let isSelected
            if (multiSelect) { isSelected = (value.find(v => v===options[i].value) !== undefined) }
            else { isSelected = (options[i].value === value) }
            
            items.push(
                <RadioBlock key={options[i].value} selected={isSelected} onClick={(e)=>updateSelect({
                    'setFieldValue': setFieldValue,
                    'name': name,
                    'currentValue': value,
                    'value': options[i].value,
                    'multiSelect': multiSelect}
                )}>
                    <div>{options[i].label}</div>
                </RadioBlock>
            )
        }
        return(
        <FieldDiv className={classNames}>
            <FieldLabel>{label}</FieldLabel>
            <RadioBlockGroup>
                {items}
            </RadioBlockGroup>
            {touched[name] && errors[name] && <ErrorLabel>{errors[name]}</ErrorLabel> }
        </FieldDiv>
    )}

}




export default FormikForm