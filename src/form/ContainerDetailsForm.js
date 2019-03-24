import React, { Component } from "react"
import styled from "styled-components"

import {CustomField, Container, ContainerHeader, ButtonsDiv, StandardFieldsDiv, CustomFieldsDiv, BoxType, Text, RelatedAccount, DateOnly} from '../component/ContainerDetails.js'

import {PhotoUploader} from '../component/PhotoUploader.js'

import { ApolloProvider, Query } from 'react-apollo'
import { getContainerById } from '../gql/query.js'

import {ContainerDetailsFileViewer} from '../component/ContainerDetailsFileViewer.js'

import get from 'lodash/get'


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
						console.log(loading, networkStatus, data)
						container = data.getContainerById
					}

					if (error) {
						console.log(error)
						loadError = true
					}
					const {printId, userDefinedName, containerType_id, rentalOrder_id} = container
					console.log('container=', loading, container)
					return(
						<Container isNoTitle={this.props.hideTitle}>
							{!this.props.hideTitle && <ContainerHeader printId={printId} userDefinedName={userDefinedName} />}
							<BoxType SKUMaster={containerType_id} />
							<ButtonsDiv>
								{container.containerUserInfo_id && <ContainerDetailsFileViewer images={container.containerUserInfo_id.uploadFiles_id} />}
								{container.containerUserInfo_id && <PhotoUploader containerUserInfo_id={container._id} onUploadSuccess={()=>refetch()} />}
							</ButtonsDiv>
							<StandardFieldsDiv>
								<RelatedAccount account={container.accountOwner_id} user={g.state.myself} />
								<Text title="Weight" data={container.weightKG+'KG'} />
								<Text title="Last Rental Order" data={get(rentalOrder_id, '_id', 'Loading...')} />
								<DateOnly title="storageExpiryDate" data={container.storageExpiryDate} />
							</StandardFieldsDiv>
							<CustomFieldsDiv>
							<CustomField label="haha" content="hehe" />
								<CustomField label="haha" content="hehe" />
							</CustomFieldsDiv>


						</Container>
					)
				}}
				</Query>
			</ApolloProvider>
		)
	}
}
