import React from 'react'
import styled from 'styled-components'

/*
Special props:
fullSize --> width: 100%

*/

const Button = styled.button`
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
    color: ${props => props.disabled ? `rgba(128, 128, 128, 0.5)` : `Black`};
    text-align: center;
    letter-spacing: 0.05em;
    background: rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease-out;
    
    ${props => props.fullSize && `width: 100%`}
`


export default Button