import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InfoList, {InfoListStandardLine} from './InfoList.js'
import {LocaleApiSubscriber} from '../stateContainer/LocaleApi.js'


class ContainerList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			a:1
		}
	}

	lineItem = ({rowObj, data, multiSelect}) => {
		let {printId, userDefinedName} = data
		console.log(rowObj)
        return (
            <InfoListStandardLine
                occupyFullRow={true}
                multiSelect={multiSelect}
                key1={rowObj.key}
                style={rowObj.style}
                showBottomBorder={true}
                contentOnClick={e=>{
                    e.preventDefault()
                    this.setRedirect(data)
                }}
				content={
					<div>{(printId===userDefinedName ? printId : userDefinedName + '(' + printId + ')')}</div>
				}
            />
        )
    }

	render() { return(
		<LocaleApiSubscriber>
		{c=>
			<InfoList 
				rowHeightCalc={(i, width)=> 30}
				headerText={<div><FontAwesomeIcon icon='boxes' /> {c.t('Containers on your hand')}</div>}
				data={this.props.containerList || []} 
				listComponent={this.lineItem}
				refreshRowHeight={true}
			/>
		}
		</LocaleApiSubscriber>
	)}
}

export default ContainerList