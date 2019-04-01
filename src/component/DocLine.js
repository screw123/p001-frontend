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

const Table = styled.div``

const TableCell = styled.div`
	border-right: 1px solid #CDCDCD;
  color: #787F84;
  font-size: 18px;
  text-align: ${props => (props.left ? 'left' : 'center')};
  padding: 1.5em 3em;
  width: calc(100% / 4);
`

const TextNoWrap = styled.div`
	font-size: 1rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: #787F84;
`

const TextDiv = styled.div`
	font-size: 1rem;
`

const LongTextDiv = styled.div`
	font-size: 1rem;
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
	font-size: 1rem;
	white-space: nowrap;
	color: #787F84;
`

const ContainerDisplayGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(${singleContainerDisplaySize}px, 1fr));
`


const Text = ({text, label})=>(
	<TableCell>
		<TextNoWrap>{c.t(label)}</TextNoWrap>
		<TextNoWrap>{text}</TextNoWrap>
	</TableCell>

)

const LongText = ({text, label})=>(
	<TableCell>
		<LongTextDiv>{text}</LongTextDiv>
		<LongTextDiv>{c.t(label)}</LongTextDiv>
	</TableCell>

)

const ID = ({text, label})=>(
	<TableCell>
		<IDDiv>{c.t(label)}</IDDiv>
		<IDDiv>{text}</IDDiv>
	</TableCell>
)

const Status = ({text, color, float})=>(
	<TableCell>
		<Tag {...color(text)}>{c.t(text)}</Tag>
	</TableCell>
)

const YesNo = ({text, label})=>(
	<TableCell>
		<IDDiv>{c.t(label)}</IDDiv>
		<IDDiv>{text}</IDDiv>
	</TableCell>

)

const DateOnly = ({text, label})=>(
	<TableCell>
		<TextNoWrap>{c.t(label)}</TextNoWrap>
		<TextNoWrap>{c.moment(text).calendar()}</TextNoWrap>
	</TableCell>
)

const DateTime = ({text, label})=>(
	<TableCell>
		<TextNoWrap>{c.t(label)}</TextNoWrap>
		<TextNoWrap>{c.moment(text).calendar()}</TextNoWrap>
	</TableCell>
)

const Amount = ({text, label})=>(
	<TableCell>
		<IDDiv>{c.t(label)}</IDDiv>
		<IDDiv>{text}</IDDiv>
	</TableCell>
)

const DocType = ({text, float})=> (
	<Tag {...docTypeColor(text)}>{c.t(text)}</Tag>
)

export const SmallPic = ({text, url, width, height})=>(
	<img src={url} width={width} height={height} />
)

const ContainerSummary = ({docLines}) => {
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
			<TableCell key={summaryKeys[i]+'1'}>
				<SmallPic url={summary[summaryKeys[i]].URL} width={c.state.defaultHeight*2} height={c.state.defaultHeight*2} />
				<Text label={summaryKeys[i]} text={summary[summaryKeys[i]].qty} />
			</TableCell>
		)

	}
	return (<ContainerDisplayGrid>{displayCom}</ContainerDisplayGrid>)

}

export default {Text, LongText, ID, Status, YesNo, DateOnly, DateTime, Amount, SmallPic, ContainerSummary, singleContainerDisplaySize, DocType}