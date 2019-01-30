import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List} from 'react-virtualized';
import {Section} from './BasicComponents.js'
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'

import {SmallPic} from './DocLine.js'


class ContainerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			a:1
		}
		this.lineItem = this.lineItem.bind(this)
	}

	lineItem = ({rowObj, c}) =>{
		const container = this.props.containerList[rowObj.index]
		console.log(container.containerType_id._id)
		return (<div style={rowObj.style} key={rowObj.key} onClick={this.props.itemOnClick}>
			<SmallPic url={this.props.SKUInfo.find(v=> v._id===container.containerType_id._id).iconPicURL} width={c.state.defaultHeight * 3} height={c.state.defaultHeight * 3} />
			<span>{container.userDefinedName + ' ' + (container.printId!==container.userDefinedName ? '(' + container.printId + ')': '')}</span>
		</div>)
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