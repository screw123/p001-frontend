import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import c from '../stateContainer/LocaleApi.js'
import {Title} from './DocDetails.js'

export {Container, Title, ButtonsDiv, FieldsDiv} from './DocDetails.js'


const CustomFieldWrapper = styled.div`
	box-sizing: border-box;
	display: grid;
	grid-template-columns: 4rem 1rem auto;
`

const CustomFieldTitle = styled.span`
	font-size: 0.8rem;
	font-weight: 600;
	text-transform: uppercase;
	text-overflow: ellipsis;
`

const TextNoWrap = styled.div`
	font-size: 1rem;
	white-space: nowrap;
	text-overflow: ellipsis;
`

export const ContainerHeader = ({printId, userDefinedName}) => (
	<Title><span>{userDefinedName}</span><span>{printId !== userDefinedName ? " (" + printId + ")" : ""}</span></Title>
)

export const CustomField = ({label, content}) => {
	return (
		<CustomFieldWrapper>
			<CustomFieldTitle>{c.t(label)}</CustomFieldTitle>
			<span>|</span>
			<TextNoWrap>{content}</TextNoWrap>
		</CustomFieldWrapper>
	)
}

export const Avatar = ({imgURL, size}) => (
	<RoundImg src={imgURL} size={size} background='pink' />
)

const RoundImg = styled.img`
	border-radius: 50%;
	width: ${({size=3})=>size}rem;
	height: ${({size=3})=>size}rem;
	${({background})=> background? 'background: '+background : '' }
`