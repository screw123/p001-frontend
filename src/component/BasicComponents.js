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

export const Background = ({children}) => (
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

const SectionHeader = styled.div`
    font-weight: 600;
    font-size: 1.5rem;
    box-sizing:border-box;
	display: grid;
	padding: 1rem 0;
	grid-template-columns: [s1] 2.5% [iconLeft] ${({headerIconLeft})=>headerIconLeft?'12.5':'0'}% [content] auto [iconRight] ${({headerIconRight})=>headerIconRight?'12.5':'0'}% [end] 2.5% [s2];
`

const HeaderText = styled.div`
	grid-column: content / iconRight;
`

const HeaderIconLeft = styled.div`
	grid-column: iconLeft / content;
`

const HeaderIconRight = styled.div`
	grid-column: iconRight / end;
`

export const Section = (props) => {
	console.log(props)
	return(
	<SectionHeader {...props}>
		<HeaderIconLeft {...props}>{props.headerIconLeft}</HeaderIconLeft>
		<HeaderText {...props}>{props.headerText}</HeaderText>
		<HeaderIconRight {...props}>{props.headerIconRight}</HeaderIconRight>
	</SectionHeader>
)}

export default {}