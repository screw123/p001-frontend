import React from 'react'
import styled from 'styled-components'

const BG = styled.div`
    background: White;
    box-sizing: border-box;
    min-height: 100vh;
`

const BG2 = styled.div`
    @media (max-width: 1366px) {
        width: 100%
    }
    
    @media (min-width: 1367px) {
        width: 1366px
        margin: auto
    }
`

const Background = ({children}) => (
    <BG>
        <BG2>
            {children}
        </BG2>
    </BG>
)

export const WrapRow = styled.div`
    display: flex;
    flex-flow: row wrap;
`

export const StraightRow = styled.div`
    display: flex
    flex-flow: row nowrap;
`

export const ClickableText = styled.div`
    font-weight: 600;
    cursor: pointer;
`

export const Tag = styled.span`
    ${props => props.float && `float: ${props.float}`};
    background: ${props => props.background? props.background : 'Red'};
    padding: 0.25rem;
    font-size: 0.7rem;
    border-radius: ${props => props.circle? `50%`:`0.2rem`};
    color: ${props => props.color ? props.color : `White`};
    ${({children})=>children? '': 'visibility: hidden'};
`


export default Background