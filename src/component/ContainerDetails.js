import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import c from '../stateContainer/LocaleApi.js'
import {Title, FieldWrapper} from './DocDetails.js'

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

const Description = styled.div`
	font-size: 0.8rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: DimGray;
`

export const BoxType = ({SKUMaster}) => {
	const {name, iconPicURL, widthM, lengthM, heightM} = SKUMaster
	return (
		<FieldWrapper span={2} >
			<Avatar imgURL={iconPicURL} size={3} />
			<div>
				<Description>{name}</Description>
				<Description>{lengthM*100 + 'cm X ' + widthM*100 + 'cm X ' + heightM*100 + 'cm'}</Description>
			</div>
		</FieldWrapper>
	)
}

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
	border-size: 0px;
	border-radius: 50%;
	width: ${({size=3})=>size}rem;
	height: ${({size=3})=>size}rem;
	${({background})=> background? 'background: '+background : '' }
`