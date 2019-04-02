import React from 'react'
import styled from 'styled-components'

import { FieldDiv, FieldLabel, ErrorLabel } from './Formik-Basic.js'
import { LoadingIcon } from '../component/Loading.js'
import Select from 'react-select'

/*
MultiSelect is designed to minimize user's effort to interact with the app.
If no. of options <=3, we just lay out all options on screen and let user change with 1 click.

If options >3, we think it will be too crowded on screen so we group them up.
Currently we think we should use a dropdown box.  

*/

const SelectStyled = styled(Select)`

    ${SelectStyled} > div{
      border-radius: 25px;
      border: none;
      color:#787F84;
      background-color: #F4F4F4;
    }

    ${SelectStyled} svg{
      fill: #E61D6E;
      stroke: #E61D6E;
    }

`

const RadioBlockGroup = styled.div`
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 33% 34% 33%;
    grid-column-gap: 0.25em;
    width: 100%
`

const RadioBlock = styled.div`
    border: 0.1em solid ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `White`};
    display: block;
    font-size: 0.7em;
    padding: 0.5em;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `Black`};
    ${({selected}) => selected? `background-color: rgba(255, 64, 112, 0.2);` : ``}
`

const updateSelect = ({setFieldValue, name, currentValue, value, multiSelect, isSelect}) => {
    let newValue = value
    //selectaddress issues #15, inject a value key for each object in array 
    if (isSelect) { 
        if (multiSelect) {
            //multiSelect mode react-select returns array of selected key/value pair
            newValue = value.map(v=> {return v.value}) 
        }
        else { newValue = value.value } //react-select send back {value, label} obj instead of just value
        setFieldValue(name, newValue)
    }
    else { //if it's custom radio box, individual <option> will call this function instead (the set of options is not a complete component itself), thus we need to manage the array of selected values for it
        if (multiSelect) {
            if (currentValue.includes(newValue)) {
                setFieldValue(name, currentValue.filter(v => newValue !== v))
            }
            else {
                setFieldValue(name, currentValue.concat([newValue]))
            }
        }
        else {
            setFieldValue(name, newValue)
        }
    }
}

export const MultiSelect = ({
    field: { name, value, ...fields },
    form: { setFieldValue },
    touched, classNames, err, options, disabled, label, multiSelect, isLoading, hidden, customOption, customMultiValueLabel, customSingleValueLabel, defaultValue, placeholder, isClearable, isSearchable, backspaceRemovesValue, ...props }) => {
    /*  Radio by default,
        if options > 3,  will change to dropdown
        if multiSelect, will change radio to checkbox
        field.name = internal name used by code
        label = text label shown on form
        defaultValue = value or [value]
        options = [{value, label}]
        customOption: A custom render of options can be supplied as props
    */
    
    let customComponentsMS = {}
    if (customOption) {customComponentsMS['Option'] = customOption}
    if (customMultiValueLabel) {customComponentsMS['MultiValueLabel'] = customMultiValueLabel}
    if (customSingleValueLabel) {customComponentsMS['SingleValue'] = customSingleValueLabel}

    if (hidden) 
        return null
    if (isLoading) {
        return (
            <FieldDiv className={classNames}>
                <FieldLabel>{label}</FieldLabel>
                <LoadingIcon />
            </FieldDiv>
        )
    }
    //className using here is a big exception.  This is only for comply with Formik.  Remove this when we move away from Formik
    else if (options.length===0) {
        return(
            <FieldDiv className={classNames}>
                <FieldLabel>{label}</FieldLabel>
                <div>{placeholder}</div>
            </FieldDiv>
        )
    }

    // if we have more than 3 options, we just get lazy and wrap the whole component in react-select.  We should replace this with our current setup in future releases.
    else if (options.length>3) {
        return (
        <FieldDiv className={classNames}>
            <FieldLabel>{label}</FieldLabel>
            <SelectStyled
                name={name}
                value={(multiSelect)? 
                    options.filter(v=> (value.find(u=>u===v.value)!==undefined) ) :
                    options.filter(v=> v.value===value)
                }
                isDisabled={disabled}
                isLoading={isLoading}
                isMulti={multiSelect}
                isSearchable={isSearchable}
                isClearable={isClearable}
                backspaceRemovesValue={backspaceRemovesValue}
                placeholder={placeholder}
                options={options}
                components={customComponentsMS}
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
            {err && <ErrorLabel>{err}</ErrorLabel> }
        </FieldDiv>
    )}


    else { 
        let items = []
        for(let i=0; i<options.length;i++) {
            
            let isSelected
            
            //determine if this option is selected
            if (multiSelect) { 
                isSelected = (value.find(v => {
                    return (v===options[i].value)
                }) !== undefined)
            }
            else { isSelected = (options[i].value === value) }
            
            //If the whole MultiSelect is disabled, render a disabled view of a particular option
            if (disabled) {
                if (customOption) {
                    items.push(customOption({
                        data: options[i],
                        key: options[i].value,
                        selected: isSelected,
                        disabled: true
                    }))
                }
                else {
                    items.push(
                        <RadioBlock key={options[i].value} selected={isSelected} disabled={true} >
                            {options[i].label}
                        </RadioBlock>
                    )
                }
                
            }
            else {
                if (customOption) {
                    items.push(customOption({
                        data: options[i],
                        key: options[i].value,
                        selected: isSelected,
                        onClick: (e)=>updateSelect({
                            'setFieldValue': setFieldValue,
                            'name': name,
                            'currentValue': value,
                            'value': options[i].value,
                            'multiSelect': multiSelect}
                        )
                    }))
                }
                else {
                    items.push(
                        <RadioBlock key={options[i].value} selected={isSelected} onClick={(e)=>updateSelect({
                            'setFieldValue': setFieldValue,
                            'name': name,
                            'currentValue': value,
                            'value': options[i].value,
                            'multiSelect': multiSelect}
                        )}>
                            {options[i].label}
                        </RadioBlock>
                    )
                }
                
            }
        }
        return(
            <FieldDiv className={classNames}>
                <FieldLabel>{label}</FieldLabel>
                <RadioBlockGroup>
                    {items}
                </RadioBlockGroup>
                {err && <ErrorLabel>{err}</ErrorLabel> }
            </FieldDiv>
        )
    }
}