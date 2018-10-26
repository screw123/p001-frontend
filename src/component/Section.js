import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SectionHeader = styled.div`
    font-weight: 600;
    font-size: 1.5em;
    padding: 1em;
    display: inline-block
`

export const HeaderText = styled.span`
    padding: 1em;
`

export const Section = (props) => (
	<SectionHeader>
		{props.headerIconLeft}
		<HeaderText>{props.headerText}</HeaderText>
		{props.headerIconRight}
	</SectionHeader>
)

export default {}