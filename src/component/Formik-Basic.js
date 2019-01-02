import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {Tag, ToolTip} from '../component/BasicComponents.js'

//Field level Error Label.  For form level ErrorLabel use FormErr
export const ErrorLabel = styled.div`
    color: Red;
    display: block;
    font-size: 0.8em;
`

//FieldDiv is what bounds for each field in a form, make sure all components looks more or less the same, 
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

//FieldRow is for Grouping FieldDiv together and form a virtual row.  FieldDivs will auto flow due to display=flex
export const FieldRow = styled(FieldDiv)`
    display: flex
    width: 100%
    box-sizing:border-box;
    padding: 1em;
    flex-flow: row wrap;
`

//The name/title of component inside FieldDiv
export const FieldLabel = styled.label`
    display: block;
    text-transform: uppercase;
    font-size: 0.9em;
`

//Form Button
const FB = styled.button`
    border: 0.2em solid ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `White`};
	display: flex;
	flex: 0 0 auto;
    align-self: stretch;
    font-size: 1em;
    margin: 5px 15px;
    padding: 11px;
    font-weight: ${props => props.disabled ? `400` : `600`};
    color: ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `Black`};
    ${props => props.fullSize && `width: 100%`}
`

export const FormButton = ({children, ...props}) => (
    <FB {...props}>
        {children}
    </FB>
)


//FormErr is form level error message display
const FE = styled.label`
    color: Red;
    display: block;
    font-size: 1em;
`

export const FormErr = ({children, ...props}) => ( <FE {...props}>{children}</FE> )

//FormIcon is by default for showing icon with Input.  Can be used with other components if needed
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

export const FormTag = ({
    field: { name, ...fields }, // { name, value, onChange, onBlur }
    form: { touched }, //also values, handleXXXX, dirty, isValid, status, etc.
    classNames, label, hidden, background, float, color, value, ...props }) => {

    return (
        <FieldDiv className={classNames}>
            <FieldLabel {...props}>
                {label}
                <div><Tag background={background} float={float} color={color}>{value}</Tag></div>
            </FieldLabel>
        </FieldDiv>
    )

}

export default {FieldDiv, FieldRow, FieldLabel, ErrorLabel, FormErr, FormIcon, FormButton, FormTag}

