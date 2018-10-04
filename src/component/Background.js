import React from 'react'
import styled from 'styled-components'

const BG = styled.div`
    background: GreenYellow;
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
    }`

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

export const SectionHeader = styled.div`
    font-weight: 600;
    font-size: 1.5em;
    padding: 1em;
    display: flex
    justify-content: space-between
`
export const HIL = styled.div`
`
export const HT = styled.div`
`
export const HIR = styled.div`
`

export default Background