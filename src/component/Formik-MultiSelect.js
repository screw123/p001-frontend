import React from 'react'
import styled from 'styled-components'

import { FieldDiv, FieldLabel, ErrorLabel } from './Formik-Basic.js'
import {LoadingIcon, BigLoadingScreen} from '../component/Loading'
import Select, { components } from 'react-select'

const RadioBlockGroup = styled.div`
    box-sizing:border-box;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 33% 34% 33%;
    grid-column-gap: 0.25em;
    box-sizing:border-box;
    width: 100%
`

const RadioBlock = styled.div`
    border: 0.1em solid #999999;
    border-radius: 0.25em;
    display: block;
    font-size: 0.7em;
    padding: 0.5em;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    ${({selected}) => selected? `background-color: rgba(255, 255, 255, 0.8);` : ``}
`

const updateSelect = ({setFieldValue, name, currentValue, value, multiSelect, isSelect}) => {
    let newValue = value
    //selectaddress issues #15, inject a value key for each object in array 
    console.log("onchange is triggered : "+value)
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
    touched, classNames, err, options, disabled, label, multiSelect, isLoading, hidden, customOption, customMultiValueLabel, defaultValue, placeholder, ...props }) => {
    /*  Radio by default, will change to select if options > 3
        if multi-select, will change radio to checkbox
        field.name = internal name used by code
        label = text label shown on form
        defaultValue = value or [value]
        options = [{value, label}]  */
    
    let customComponentsMS = {}
    if (customOption) {customComponentsMS['Option'] = customOption}
    if (customMultiValueLabel) {customComponentsMS['MultiValueLabel'] = customMultiValueLabel}

    console.log('customComponentsMS=', customComponentsMS)
    if (hidden) 
        return null
    else if (options.length>3) {
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
                isLoading={isLoading}
                isSearchable={true}
                isMulti={multiSelect}
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
    else { //pending: disabled, components, onChange
        let items = []
        for(let i=0; i<options.length;i++) {
            
            let isSelected
            if (multiSelect) { isSelected = (value.find(v => {
                console.log('inside Radiobox, v=', v, ' option[i].value=', options[i].value)
                return (v===options[i].value)
            }) !== undefined) }
            else { isSelected = (options[i].value === value) }
            
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