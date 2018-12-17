import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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