import React from 'react'
import styled from 'styled-components'
import Input from './Input.js'

import { I18n } from 'react-i18next'

//A normal input field, with label, input and error span

const RedLabel = styled.label`
    color: orange;
`

const TextField = ({
    field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
    form: { touched, errors }, //also values, handleXXXX, dirty, isValid, status, etc.
    classNames,
    label,
    ...props
}) => {
    return (
        <I18n>
        {(t) => (
            <div className={classNames}>
                <label>{t(label)}</label>
                <Input
                    name={name}
                    placeholder={t(placeholder)}
                    {...fields}
                    {...props}
                />
                {touched[name] && errors[name] && <RedLabel> { t(errors[name]) } </RedLabel> }
            </div>
        )}
        </I18n>
    )
}



export default TextField