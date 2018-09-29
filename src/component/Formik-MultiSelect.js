import React from 'react'
import styled from 'styled-components'

import { FieldDiv, FieldLabel, ErrorLabel } from './Formik-Basic.js'
import {LoadingIcon, BigLoadingScreen} from '../component/Loading'
import Select, { components } from 'react-select'

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

const updateSelect = ({setFieldValue, name, currentValue, value, multiSelect, isSelect}) => {
    let newValue = value
    //selectaddress issues #15, inject a value key for each object in array 
    console.log("onchange is triggered : "+value.value)
    if (isSelect) { 
        if (multiSelect) {
            //multiSelect mode react-select returns array of selected key/value pair
            newValue = value.map(v=> {return v.value}) 
        }
        else { newValue = value.value } //react-select send back {value, label} obj instead of just value
        setFieldValue(name, newValue)
    }
    else if (multiSelect) { //if it's custom radio box, individual <option> will call this function instead (the set of options is not a complete component itself), thus we need to manage the array of selected values for it
        if (currentValue.includes(newValue)) {
            setFieldValue(name, currentValue.filter(v => newValue !== v))
        }
        else {
            setFieldValue(name, currentValue.concat([newValue]))
        }
    }
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
    classNames, options, disabled, label, multiSelect, isLoading, hidden, ...props }) => {
    /*  Radio by default, will change to select if options > 3
        if multi-select, will change radio to checkbox
        field.name = internal name used by code
        label = text label shown on form
        defaultValue = value or [value]
        options = [{value, label}]  */
    if (hidden) 
        return null
    else {
        return (
        <FieldDiv className={classNames}>
            <FieldLabel>{label}</FieldLabel>
            <Select
                name={name}
                value={(multiSelect)? 
                    options.filter(v=> (value.find(u=>u===v.value)!==undefined) ) :
                    options.filter(v=> v.value===value)
                }
                isDisabled={disabled}
                isLoading={LoadingIcon}
                isSearchable={true}
                isMulti={multiSelect}
                options={options}
                {...fields}
                onChange={(v)=>updateSelect({
                    'setFieldValue': setFieldValue,
                    'name': name,
                    'currentValue': value,
                    'value': v,
                    'multiSelect': multiSelect,
                    'isSelect': true
                })}
            />
            {touched[name] && errors[name] && <ErrorLabel>{errors[name]}</ErrorLabel> }
        </FieldDiv>
    )}
    
    /*else { 
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
    )}*/

}