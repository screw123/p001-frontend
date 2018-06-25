import React from 'react'
import styled from 'styled-components'

//A normal input field, with label, input and error span

const RedLabel = styled.label`
    color: orange;
`

const TextField = ({
    field: { name, ...fields }, // { name, value, onChange, onBlur }
    form: { touched, errors }, //also values, handleXXXX, dirty, isValid, status, etc.
    classNames,
    label,
    ...props
}) => {
    return (
        <div className={classNames}>
            <label>{label}</label>
            <input
                name={name}
                {...fields}
                {...props}
            />
            {touched[name] && errors[name] && <RedLabel> { errors[name] } </RedLabel> }
        </div>
    )
}



export default TextField