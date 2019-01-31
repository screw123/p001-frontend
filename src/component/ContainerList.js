import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List} from 'react-virtualized';
import {Section} from './BasicComponents.js'
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

import {SmallPic} from './DocLine.js'
import without from 'lodash/without'

const ContainerDiv = styled.div`
	${({selected})=> selected? 'background: pink;':''}
`



class ContainerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			a:1
		}
		this.lineItem = this.lineItem.bind(this)

		this.toggleSelectedItem = this.toggleSelectedItem.bind(this)
	}

	toggleSelectedItem = (e, i) => {
		e.preventDefault()
		console.log(i)
		const selectedIndex = this.props.selected.indexOf(i)

		//if cannot find (i.e. index =-1)
		if (selectedIndex<0) this.props.updateSelected( this.props.selected.concat([i]) )
		else this.props.updateSelected( without(this.props.selected, i ) )
	}

	lineItem = ({rowObj, c}) =>{
		const container = this.props.containerList[rowObj.index]
		const selected = this.props.selected.includes(container._id)

		return (
			<ContainerDiv selected={selected} style={rowObj.style} key={rowObj.key} onClick={e=>this.toggleSelectedItem(e, container._id)}>
				<SmallPic url={this.props.SKUInfo.find(v=> v._id===container.containerType_id._id).iconPicURL} width={c.state.defaultHeight * 3} height={c.state.defaultHeight * 3} />
				<span>{container.userDefinedName + ' ' + (container.printId!==container.userDefinedName ? '(' + container.printId + ')': '')}</span>
			</ContainerDiv>
		)
	}

	render() { return(
		<LocaleApiSubscriber>
		{c=>

			<List
				height={Math.min(5, this.props.containerList.length) * c.state.defaultHeight * 3}
				rowCount={this.props.containerList.length}
				rowHeight={ c.state.defaultHeight * 3 }
				width={220} 
				rowRenderer={a =>this.lineItem({rowObj: a, c: c})}
				noRowsRenderer={()=>(<div>{c.t('There are no boxes pending to ship back')}</div>)}
			/>
		}
		</LocaleApiSubscriber>
	)}
}

export default ContainerList