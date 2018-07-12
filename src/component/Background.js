import React from 'react'
import styled from 'styled-components'

const Background = styled.div`
    background: GreenYellow;
    box-sizing: border-box;
    min-height: 100vh;
`

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

export default Background