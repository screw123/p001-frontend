import React from 'react'
import styled from 'styled-components'
import { LoadingIcon } from './Loading.js'

export const RadioBlockGroup = styled.div`
	box-sizing:border-box;
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
	grid-column-gap: 0.25rem;
	box-sizing:border-box;
	width: 100%
`

export const RadioBlock = styled.div`
	border: 0.1em solid ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `White`};
	border-radius: 0.25rem;
	display: block;
	font-size: 0.7rem;
	padding: 0.25rem;
	cursor: pointer;
	overflow: hidden;
	text-overflow: ellipsis;
	text-align: center;
	color: ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `Black`};
	${({selected}) => selected? `background-color: rgba(255, 64, 112, 0.2);` : ``}
`

export const RadioSelect = ({value, onChange, touched, err, options, disabled, multiSelect, isLoading, hidden, customOption, placeholder, ...props }) => {
    /*  field.name = internal name used by code
        label = text label shown on form
        options = [{value, label}]  */
    
    if (hidden) 
        return null
    else if (options.length===0) {
        return(
			<div>{placeholder}</div>
        )
    }
    else {
        let items = []
        for(let i=0; i<options.length;i++) {
            let isSelected
			if (isLoading) {return <LoadingIcon />}
			
            if (multiSelect) { isSelected = (value.find(v => v===i) !== undefined) }
            else { isSelected = (i === value) }

			if (customOption) {
				items.push(customOption({
					data: options[i],
					key: options[i].value,
					selected: isSelected,
					disabled: disabled,
					onClick: disabled? undefined: e=>onChange(e, i)
				}))
			}
			else {
				items.push(
					<RadioBlock key={options[i].value} selected={isSelected} disabled={disabled}
						onClick={disabled? undefined: e=>onChange(e, i)}
					>
						{options[i].label}
					</RadioBlock>
				)
			}
		}
        return(
			<RadioBlockGroup>
				{items}
			</RadioBlockGroup>
        )
    }
}



export default {}