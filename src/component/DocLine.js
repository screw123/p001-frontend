import React from 'react'
import styled from 'styled-components'

import {Tag, ToolTip} from '../component/BasicComponents.js'

import c from '../stateContainer/LocaleApi.js'

export const singleContainerDisplaySize = 180

export const docTypeColor = (docType) =>{
    switch(docType) {
        case 'PickUpOrder':
            return {background: 'Green', color: 'White'}
        case 'DeliveryOrder':
            return {background: 'DodgerBlue ', color: 'White'}
        case 'Invoice':
            return {background: 'GoldenRod ', color: 'White'}
        case 'RentalOrder':
            return {background: 'Indigo', color: 'White'}
        default:
            return {}
    }
}

const TextNoWrap = styled.div`
	font-size: 1rem;
	white-space: nowrap;
	text-overflow: ellipsis;
`

const TextDiv = styled.div`
	font-size: 1rem;
`

const LongTextDiv = styled.div`
	font-size: 0.9rem;
	text-overflow: ellipsis;
`

const InlineDiv = styled.div`
	display: inline-block
`

const FlexDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const IDDiv = styled.div`
	font-size: 0.8rem;
	white-space: nowrap;
`

const ContainerDisplayGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(${singleContainerDisplaySize}px, 1fr));
	padding: 0.25rem 0;
`

export const SingleContainerDisplay = styled.div`
	box-sizing:border-box;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	width: 100%
`

const Text = ({t, l})=>(
	<TextNoWrap>{c.t(l) + ' : '+t}</TextNoWrap>
)

const LongText = ({t, l})=>(
	<LongTextDiv>{c.t(l) + ' : '+t}</LongTextDiv>
)

const ID = ({t, l})=>(
	<IDDiv>{c.t(l) + ' : '+ t}</IDDiv>
)

const Status = ({t, color, float})=>(
	<Tag {...color(t)} float={float}>{c.t(t)}</Tag>
)

const YesNo = ({t, l})=>(
	<IDDiv>{c.t(l) + ' : '+t}</IDDiv>
)

const DateOnly = ({t, l})=>(
	<TextNoWrap>{c.t(l) + ' : '+ c.moment(t).calendar()}</TextNoWrap>
)

const DateTime = ({t, l})=>(
	<TextNoWrap>{c.t(l) + ' : '+ c.moment(t).calendar()}</TextNoWrap>
)

const Amount = ({t, l})=>(
	<IDDiv>{c.t(l) + ' : '+t}</IDDiv>
)

const DocType = ({t, float})=> (
	<Tag {...docTypeColor(t)} float={float}>{c.t(t)}</Tag>
)

export const SmallPic = ({t, url, width, height})=>(
	<img src={url} width={width} height={height} />
)

const ContainerSummary = ({docLines, l}) => {
	let summary = {}
	let displayCom = []
	for(let i=0;i<docLines.length;i++) {
		if (summary[docLines[i]['SKU_id']['name']]===undefined) {
			summary[docLines[i]['SKU_id']['name']] = {qty: docLines[i].qty, URL: docLines[i]['SKU_id'].iconPicURL }
		}
		else {
			summary[docLines[i]['SKU_id']['name']].qty = summary[docLines[i]['SKU_id']['name']].qty + docLines[i].qty
		}
	}

	const summaryKeys = Object.keys(summary)
	for(let i=0;i<summaryKeys.length;i++) {
		displayCom.push(
			<SingleContainerDisplay key={summaryKeys[i]+'1'}>
				<SmallPic url={summary[summaryKeys[i]].URL} width={c.state.defaultHeight*2} height={c.state.defaultHeight*2} />
				<Text l={summaryKeys[i]} t={summary[summaryKeys[i]].qty} />
			</SingleContainerDisplay>
		)

	}
	return (<ContainerDisplayGrid>{displayCom}</ContainerDisplayGrid>)

}

export default {Text, LongText, ID, Status, YesNo, DateOnly, DateTime, Amount, SmallPic, ContainerSummary, singleContainerDisplaySize, DocType}