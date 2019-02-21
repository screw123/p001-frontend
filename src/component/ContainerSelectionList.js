import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { List } from "react-virtualized"
import { LocaleApiSubscriber } from "../stateContainer/LocaleApi.js"

import {Tag} from './BasicComponents.js'

import { SmallPic } from "./DocLine.js"
import without from "lodash/without"

const OuterWrapper = styled.div`
	box-sizing:border-box;
	display: grid;
	grid-template-rows: [start] 2rem [info] 2rem [buttons] auto [end];
	width: 250px;
`

const HeaderWrapper = styled.div`
	grid-row: start / info;
`

const ButtonWrapper = styled.div`
	grid-row: info / buttons;
	display: flex;

`

const ListWrapper = styled.div`
	grid-row: buttons / end;
`

const ContainerDiv = styled.div`
	${({ selected }) => (selected ? "background: pink;" : "")}
	cursor: pointer;
`

const Button = styled.div`
	display: flex;
	background: ${props => props.background[0]};
	font-weight: bold;
	cursor: pointer;
	&:hover {
		background: ${props => props.background[1]};
	}
	transition: background 300ms ease-out;
	width: 100px;
`

class ContainerSelectionList extends React.Component {
	constructor(props) {
		super(props)
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
		const isNew = container.status==='EMPTY'

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
				{isNew && <Tag float='right' background='Yellow' color='Green'>{c.t('Just Ordered!')}</Tag>}
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
				<OuterWrapper>
					<HeaderWrapper>
						Number of container selected: {this.props.selected.length}
					</HeaderWrapper>
					<ButtonWrapper>
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
					</ButtonWrapper>
					<ListWrapper>
						<List
							height={Math.min(5, this.props.containerList.length) * c.state.defaultHeight * 3}
							rowCount={this.props.containerList.length}
							rowHeight={c.state.defaultHeight * 3}
							width={220}
							rowRenderer={a => this.lineItem({ rowObj: a, c: c })}
							noRowsRenderer={() => <div>{c.t("There are no boxes pending to ship back")}</div>}
						/>
					</ListWrapper>
				</OuterWrapper>
			)}
			</LocaleApiSubscriber>
		)
	}
}

export default ContainerSelectionList
