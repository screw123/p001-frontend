import React, { Component } from "react"
import styled from "styled-components"

import {PhotoUploader} from '../component/PhotoUploader.js'
import { ApolloProvider, Query } from 'react-apollo'
import { getContainerById } from '../gql/query.js'
import {ContainerDetailsFileViewer} from '../component/ContainerDetailsFileViewer.js'

import SystemError from '../component/SystemError.js'
import get from 'lodash/get'
import parseApolloErr from '../util/parseErr.js'

import {DateOnly, Text as TextField, FieldWrapper, FieldTitle, TextNoWrap} from '../component/DocDetails.js'
import {Header, Header2, Text, Button, BigCard, Background} from '../component/BasicComponents'

export default class ContainerDetailsForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			files: []
		}
	}

	render() {
		const c = this.props.i18n
		const g = this.props.login
		console.log('container=', this.props.container)
		return (
			<ApolloProvider client={g.getGqlClient()}>
				<Query query={getContainerById} variables={{_id: this.props.container._id}} notifyOnNetworkStatusChange>
				{({ loading, error, data, networkStatus, refetch }) => {
					let container, loadError
					loadError = false
					if (loading) {
						container = this.props.container
					}
					else {
						if (error) {
							const errStack = parseApolloErr(error, c.t)
							console.log(errStack)
							return (<SystemError message={errStack[0].message} />)
						}
						else {
							console.log(loading, networkStatus, data)
							container = data.getContainerById
						}
					}
					
					
					const {printId, userDefinedName, containerType_id, rentalOrder_id} = container
					console.log('container=', loading, container)
					return(
						<Background><BigCard>
							<Container>
								<BoxPic src={get(containerType_id, 'iconPicURL', '/images/ico-box.svg')} />
								<BoxData container={container} t={c.t} />
								<ButtonsDiv>
									<Button>Testing</Button>
								</ButtonsDiv>
								<FilesDiv>
									{container.containerUserInfo_id && <ContainerDetailsFileViewer images={container.containerUserInfo_id.uploadFiles_id} />}
									{container.containerUserInfo_id && <PhotoUploader containerUserInfo_id={container._id} onUploadSuccess={()=>refetch()} />}
								</FilesDiv>

								<CustomFieldsDiv>
									<CustomField label="haha" content="hehe" t={c.t} />
									<CustomField label="haha" content="hehe" t={c.t} />
									<CustomField label="haha" content="hehe" t={c.t} />
									<CustomField label="haha" content="hehe" t={c.t} />
									<CustomField label="haha" content="hehe" t={c.t} />
									<CustomField label="haha" content="hehe" t={c.t} />
								</CustomFieldsDiv>
							</Container>
						</BigCard></Background>
					)
				}}
				</Query>
			</ApolloProvider>
		)
	}
}

const Container = ({children, isNoTitle})=> (
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
	//grid-template-rows: [s1] ${({isNoTitle})=> isNoTitle ? 'auto': '4rem'} [title] auto [boxtype] auto [buttons] auto [standardFields] auto [cusFields] auto [docevent] 2rem [s2];
	grid-template-rows: [s1] auto [basicInfo] auto [buttons] auto [cusFields] auto [files] auto [docevent] 2rem [s2];
	grid-gap: 1rem 1rem;
`

const BoxPic = styled.img`
	width: 150px;
	height: 150px;
	grid-column: s1 / s2;
	grid-row: s1 / basicInfo;
	justify-self: center;
	align-self: center;
`

const BoxDataDiv = styled.div`
	grid-column: s2 / end;
	grid-row: s1 / basicInfo;
	
`

const BoxDataFields = styled.div`
	display: flex;
	flex-flow: row wrap;
	padding: 1rem 0;
`

const ButtonsDiv = styled.div`
	grid-column: s2 / end;
	grid-row: basicInfo / buttons;
	display: flex;
	flex-flow: row wrap;
`

const FilesDiv = styled.div`
	grid-column: s1 / end;
	grid-row: cusFields / files;
	display: flex;
	flex-flow: row wrap;
`

export const CustomFieldsDiv = styled.div`
	grid-column: s2 / end;
	grid-row: buttons / cusFields;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	grid-gap: 0.75rem 0.25rem;
`

const BoxData = ({container, t}) =>{
	const {userDefinedName, printId, containerType_id, accountOwner_id, storageExpiryDate, rentalOrder_id, weightKG} = container

	return(
		<BoxDataDiv>
			<Header>{userDefinedName}<span>{printId !== userDefinedName ? " (" + printId + ")" : ""}</span></Header>
			<Header2>{containerType_id.name}</Header2>
			<Text>{containerType_id.lengthM*100 + 'cm X ' + containerType_id.widthM*100 + 'cm X ' + containerType_id.heightM*100 + 'cm'}</Text>
			<BoxDataFields>
				<TextField title={t('Account')} data={accountOwner_id? accountOwner_id.name : 'Loading...'} />
				<DateOnly title="storageExpiryDate" data={storageExpiryDate} />
				<TextField title={t('Weight')} data={weightKG+'KG'} />
				<TextField title={t('Last Rental Order')} data={get(rentalOrder_id, '_id', t('Loading...')) } />
			</BoxDataFields>
		</BoxDataDiv>
	)
}



export const CustomField = ({label, content,t}) => {
	return (
		<CustomFieldWrapper>
			<CustomFieldTitle>{t(label)}</CustomFieldTitle>
			<span>|</span>
			<CustomTextNoWrap>{content}</CustomTextNoWrap>
		</CustomFieldWrapper>
	)
}

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