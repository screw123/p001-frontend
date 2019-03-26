import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import c from '../stateContainer/LocaleApi.js'
import {Title, FieldWrapper, FieldTitle, TextNoWrap} from './DocDetails.js'

export {Title, Text, DateOnly} from './DocDetails.js'

export const Container = ({children, isNoTitle})=> (
	<OuterWrapper isNoTitle={isNoTitle}>
		{children}
	</OuterWrapper>
)

const OuterWrapper = styled.div`
    box-sizing:border-box;
    display: grid;
    overflow: hidden;
	min-width: 15rem;
	grid-template-columns: [s1] 1fr [s2] 1fr [s3] 1fr [s4] 1fr [end];
	grid-template-rows: [s1] ${({isNoTitle})=> isNoTitle ? 'auto': '4rem'} [title] auto [boxtype] auto [buttons] auto [standardFields] auto [cusFields] auto [docevent] 2rem [s2];
	grid-template-rows: [s1] ${({isNoTitle})=> isNoTitle ? 'auto': '4rem'} [basicInfo] auto [buttons] auto [files] auto [cusFields] auto [docevent] 2rem [s2];
	grid-gap: 1rem 0;
`

export const StandardFieldsDiv = styled.div`
	grid-column: content / end;
	grid-row: buttons / standardFields;
	align-self: center;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	grid-gap: 0.75rem 0.25rem;
`

export const CustomFieldsDiv = styled.div`
	grid-column: content / end;
	grid-row: standardFields / cusFields;
	align-self: center;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	grid-gap: 0.75rem 0.25rem;
`

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

const CustomTextNoWrap = styled.div`
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

export const ButtonsDiv = styled.div`
	grid-column: content / end;
	grid-row: basicInfo / buttons;
	align-self: center;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	padding: 1rem 0;
`

const BoxTypeWrapper = styled(FieldWrapper)`
	grid-row: title / boxtype;
	grid-column: content / end;
`

export const BoxType = ({SKUMaster}) => {
	const {name, iconPicURL, widthM, lengthM, heightM} = SKUMaster || {}
	return (
		<BoxTypeWrapper>
			<Avatar imgURL={iconPicURL} size={3} />
			<div>
				<Description>{name}</Description>
				<Description>{lengthM*100 + 'cm X ' + widthM*100 + 'cm X ' + heightM*100 + 'cm'}</Description>
			</div>
		</BoxTypeWrapper>
	)
}

export const BoxPic = styled.img`
	width: 150px;
	height: 150px;
	grid-column: s1 / s2;
	grid-row: s1 / basicInfo;
`

export const RelatedAccount = ({account, user}) => (
	<FieldWrapper>
		<FieldTitle>Account</FieldTitle>
		<TextNoWrap>{account? account.name : 'Loading...'}</TextNoWrap>
	</FieldWrapper>
)

export const ContainerHeader = ({printId, userDefinedName}) => (
	<Title><span>{userDefinedName}</span><span>{printId !== userDefinedName ? " (" + printId + ")" : ""}</span></Title>
)

export const CustomField = ({label, content}) => {
	return (
		<CustomFieldWrapper>
			<CustomFieldTitle>{c.t(label)}</CustomFieldTitle>
			<span>|</span>
			<CustomTextNoWrap>{content}</CustomTextNoWrap>
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