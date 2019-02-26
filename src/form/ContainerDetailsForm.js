import React, { Component } from "react"
import styled from "styled-components"

import {CustomField, Container, ContainerHeader, ButtonsDiv, FieldsDiv, Avatar} from '../component/ContainerDetails.js'

import { ApolloProvider, Query } from 'react-apollo'
import { getContainerById } from '../gql/query.js'

const Title = styled.h2`
	text-align: center;
	margin-top: 15px;
`

export default class ContainerDetailsForm extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		const c = this.props.i18n
		const g = this.props.login
		return (
			<ApolloProvider client={g.getGqlClient()}>
				<Query query={getContainerById} variables={{_id: this.props.container._id}} notifyOnNetworkStatusChange>
				{({ loading, error, data, networkStatus }) => {
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
					const {printId, userDefinedName, containerType_id} = container
					const {name, iconPicURL, widthM, lengthM, heightM} = containerType_id
					return(
						<Container isNoTitle={this.props.hideTitle}>
							{!this.props.hideTitle && <ContainerHeader printId={printId} userDefinedName={userDefinedName} />}
							<ButtonsDiv> </ButtonsDiv>
							<FieldsDiv>
								<div>
									<Avatar imgURL={iconPicURL} />
									<div>
										<div>{name}</div>
										<div>{lengthM*100 + 'cm X ' + widthM*100 + 'cm X ' + heightM*100 + 'cm'}</div>
									</div>
									
								</div>
								
								
							</FieldsDiv>

						</Container>
					)
				}}
				</Query>
			</ApolloProvider>
		)
	}
}
