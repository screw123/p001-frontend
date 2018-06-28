import React from 'react'
import { Form } from 'formik'
import styled from 'styled-components'
import { I18n } from 'react-i18next'

const FormikForm = styled(Form)`
    padding: 1em;
    display: flex;
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

export const TextField = ({
    field: { name, placeholder, ...fields }, // { name, value, onChange, onBlur }
    form: { touched, errors }, //also values, handleXXXX, dirty, isValid, status, etc.
    classNames,
    label,
    ...props
}) => {
    return (
        <I18n>
        {(t) => (
            <FieldDiv className={classNames}>
                <FieldLabel>{t(label)}</FieldLabel>
                <Input
                    name={name}
                    placeholder={t(placeholder)}
                    {...fields}
                    {...props}
                />
                {touched[name] && errors[name] && <ErrorLabel>{t(errors[name])}</ErrorLabel> }
            </FieldDiv>
        )}
        </I18n>
    )
}

export const FormButton = styled.button`
    box-sizing: border-box;  
    border-radius: 5px;
    border: 2px solid ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `White`};;
	display: flex;
	flex: 0 0 auto;
	align-self: center
    margin: 0.3em 0 0.3em 0.6em;
    padding: 0.3em 0 0.3em 0.6em;
    min-width: 8em;
    font-weight: ${props => props.disabled ? `400` : `600`};
    color: ${props => props.disabled ? `rgba(128, 128, 128, 0.2)` : `Black`};
    text-align: center;
    letter-spacing: 0.05em;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease-out;
    
    ${props => props.fullSize && `width: 100%`}
`

export default FormikForm