import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { List } from "react-virtualized"
import { Section } from "./BasicComponents.js"
import { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js"

import { SmallPic } from "./DocLine.js"
import without from "lodash/without"

const ContainerDiv = styled.div`
	${({ selected }) => (selected ? "background: pink;" : "")}
	cursor: pointer;
`
const SectionContainer = styled.div`
	width: 100%;
`
const TotalContainer = styled.p`
	text-align: center;
	margin: 5px 0px;
`
const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: center;
`
const Button = styled.div`
	display: flex;
	font-size: 1em;
	margin: 5px 15px;
	padding: 11px;
	background: ${props => props.background[0]};
	color: black;
	font-weight: bold;
	cursor: pointer;
	&:hover {
		background: ${props => props.background[1]};
	}
	transition: background 300ms ease-out;
`

class ContainerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			a: 1
		}
		this.lineItem = this.lineItem.bind(this)

		this.toggleSelectedItem = this.toggleSelectedItem.bind(this)
	}

	toggleSelectedItem = (e, i) => {
		e.preventDefault()
		const selectedIndex = this.props.selected.indexOf(i)

		//if cannot find (i.e. index =-1)
		if (selectedIndex < 0) this.props.updateSelected(this.props.selected.concat([i]))
		else this.props.updateSelected(without(this.props.selected, i))
	}

	lineItem = ({ rowObj, c }) => {
		const container = this.props.containerList[rowObj.index]
		const selected = this.props.selected.includes(container._id)

		return (
			<ContainerDiv
				selected={selected}
				style={rowObj.style}
				key={rowObj.key}
				onClick={e => this.toggleSelectedItem(e, container._id)}
			>
				<SmallPic
					url={this.props.SKUInfo.find(v => v._id === container.containerType_id._id).iconPicURL}
					width={c.state.defaultHeight * 3}
					height={c.state.defaultHeight * 3}
				/>
				<span>
					{container.userDefinedName +
						" " +
						(container.printId !== container.userDefinedName ? "(" + container.printId + ")" : "")}
				</span>
			</ContainerDiv>
		)
	}

	// button handling funtions
	handleSelectAll = () => {
		let selectedItems = this.props.containerList.map(item => item._id)
		this.props.updateSelected(selectedItems)
	}
	handleRemoveAll = () => {
		this.props.updateSelected([])
	}

	render() {
		return (
			<LocaleApiSubscriber>
				{c => (
					<React.Fragment>
						<Section>
							<SectionContainer>
								<TotalContainer>
									Number of container selected: {this.props.selected.length}
								</TotalContainer>
								<ButtonsWrapper>
									<Button
										onClick={this.handleSelectAll}
										background={["rgba(61, 229, 96,0.5)", "rgba(66,232,60,1)"]}
									>
										Select All
									</Button>
									<Button
										onClick={this.handleRemoveAll}
										background={["rgba(237, 73, 73, 0.5)", "rgba(237, 73, 73, 1)"]}
									>
										Remove All
									</Button>
								</ButtonsWrapper>
							</SectionContainer>
						</Section>

						<List
							height={Math.min(5, this.props.containerList.length) * c.state.defaultHeight * 3}
							rowCount={this.props.containerList.length}
							rowHeight={c.state.defaultHeight * 3}
							width={220}
							rowRenderer={a => this.lineItem({ rowObj: a, c: c })}
							noRowsRenderer={() => <div>{c.t("There are no boxes pending to ship back")}</div>}
						/>
					</React.Fragment>
				)}
			</LocaleApiSubscriber>
		)
	}
}

export default ContainerList
