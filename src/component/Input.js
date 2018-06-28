import React from 'react'
import styled from 'styled-components'

/*
Special props:
cols = integer

*/

const Input = styled.input`
    box-sizing:border-box;
    border-radius: 5px;
    border: 2px solid #999999;
	min-width: 10em;
	flex: 1 0 auto;
	width: ${({cols}) => cols ? Math.floor(100/cols) + `%` : `20em`};
    margin: 0.3em 0 0.3em 0.6em;
    padding: 0.3em 0 0.3em 0.6em;
    background-color: transparent;
    -o-text-overflow: clip;
    text-overflow: clip;
    text-shadow: 1px 1px 0 rgba(180,180,180,0.7);
`

export default Input