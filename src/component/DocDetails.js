import React from 'react'
import styled from 'styled-components'
import accounting from 'accounting'
import {AutoSizer} from 'react-virtualized'
import {Tag} from '../component/BasicComponents.js'
import c from '../stateContainer/LocaleApi.js'
import {SmallPic } from './DocLine.js'

export const Container = ({children})=> (
	<OuterWrapper>
		{children}
	</OuterWrapper>
)

const OuterWrapper = styled.div`
    box-sizing:border-box;
    display: grid;
    overflow: hidden;
	min-width: 300px;
	grid-template-columns: [s1] 2.5% [content] auto [end] 2.5% [s2];
	grid-template-rows: [s1] 4rem [title] auto [buttons] auto [content] auto [doclines] auto [docevent] 4rem [s2];
`

const Title = styled.div`
	grid-row: s1 / title;
	grid-column: content / end;
	align-self: center;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	font-size: 1.5rem;
	line-height: 1.4;
	font-weight: 600;
`

export const ButtonsDiv = styled.div`
	grid-column: content / end;
	grid-row: title / buttons;
	align-self: center;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	padding: 1rem 0;
`

export const FieldsDiv = styled.div`
	grid-column: content / end;
	grid-row: buttons / content;
	align-self: center;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	grid-gap: 0.75rem 0.25rem;
`

export const RecordID = ({docType, id}) =>(
	<Title><span>{c.t(docType)}</span><ID>{id}</ID></Title>
)

export const Text = ({title, data}) =>(
	<FieldWrapper>
		<FieldTitle>{c.t(title)}</FieldTitle>
		<TextNoWrap>{data}</TextNoWrap>
	</FieldWrapper>
)

export const DateOnly = ({title, data}) =>(
	<FieldWrapper>
		<FieldTitle>{c.t(title)}</FieldTitle>
		<TextNoWrap>{c.moment(data).calendar()}</TextNoWrap>
	</FieldWrapper>
)

export const DateTime = ({title, data}) =>(
	<FieldWrapper>
		<FieldTitle>{c.t(title)}</FieldTitle>
		<TextNoWrap>{c.moment(data).calendar()}</TextNoWrap>
	</FieldWrapper>
)

export const Num = ({title, data}) =>(
	<FieldWrapper>
		<FieldTitle>{c.t(title)}</FieldTitle>
		<TextNoWrap>{accounting.formatNumber(data)}</TextNoWrap>
	</FieldWrapper>
)

export const Dollar = ({title, data}) =>(
	<FieldWrapper>
		<FieldTitle>{c.t(title)}</FieldTitle>
		<TextNoWrap><DollarSpan>{accounting.formatMoney(data)}</DollarSpan></TextNoWrap>
	</FieldWrapper>
)

export const Status = ({title, data, color, background, float})=>(
	<FieldWrapper>
		<FieldTitle>{c.t(title)}</FieldTitle>
		<Tag color={color} background={background} float={float}>{c.t(data)}</Tag>
	</FieldWrapper>
)

export const DollarFixedPos = ({title, data}) =>(
	<FieldWrapper>
		<FieldTitle>{c.t(title)}</FieldTitle>
		<TextNoWrap>{accounting.formatMoney(data)}</TextNoWrap>
	</FieldWrapper>
)

export const Address = ({title, data}) => (
	<FieldWrapper>
		<FieldTitle>{c.t(title)}</FieldTitle>
		<AddressText>{data.legalName||c.t('DEFAULT')}</AddressText>
		<AddressText>{data.streetAddress||'N/A'}</AddressText>
		<AddressText>{data.addressRegion1||undefined}</AddressText>
		<AddressText>{data.addressRegion2||undefined}</AddressText>
		<AddressText>{data.addressCountry||'N/A'}</AddressText>
		<AddressText>Tel: {data.telephone||undefined}</AddressText>
	</FieldWrapper>
)

export const DocLines = ({title, data}) => {
	let displayCom = []
	for(let i=0;i<data.length;i++) {
		console.log(accounting.formatColumn([data[i].rent_unitPrice, 9999999],'$ ' , 1))



		displayCom.push(
			<DocLineRow key={'docLines'+i}>
				<SingleContainerDisplay>
					<SmallPic url={data[i].SKU_id.iconPicURL} width={c.state.defaultHeight*3} height={c.state.defaultHeight*3} />
					<TextNoWrap>{c.t(data[i].SKUName)}</TextNoWrap>
				</SingleContainerDisplay>
				<DocLineField>{data[i].duration + ' ' + c.t(data[i].rentMode, {count: data[i].duration})}</DocLineField>
				<DocLineField>{data[i].qty + c.t('pcs')}</DocLineField>
				<DocLineField><DollarSpan>{accounting.formatColumn([data[i].rent_unitPrice, 99999],'$ ' , 1)[0]}</DollarSpan></DocLineField>
				<DocLineField><DollarSpan>{accounting.formatColumn([data[i].rent_lineTotal, 99999],'$ ' , 1)[0]}</DollarSpan> </DocLineField>
			</DocLineRow>
		)
	}
	return (
		<DocLineWrapper>
			<Title>{c.t(title)}</Title>
			<AutoSizer disableHeight>
			{({width}) => (
				<DocLineRowsDiv width={width}>
					<DocLineRow>
						<FieldTitleGrid width={180}>{c.t('Box Type')}</FieldTitleGrid>
						<FieldTitleGrid width={100}>{c.t('Rent Mode')}</FieldTitleGrid>
						<FieldTitleGrid width={100}>{c.t('Quantity')}</FieldTitleGrid>
						<FieldTitleGrid width={100}>{c.t('Unit Price')}</FieldTitleGrid>
						<FieldTitleGrid width={100}>{c.t('Total Price')}</FieldTitleGrid>
					</DocLineRow>
					{displayCom}
				</DocLineRowsDiv>
			)}
			</AutoSizer>
			
		</DocLineWrapper>
	)
}

const DocLineRowsDiv = styled.div`
	display: block;
	overflow: auto;
	width: ${({width})=>width}px;
`

const DocLineRow = styled.div`
	flex-wrap: nowrap;
	display: grid;
    overflow: hidden;
	grid-template-columns: 180px 100px 100px 100px 100px;
	width: 580px;
	align-items: center;
`

export const SingleContainerDisplay = styled.div`
	box-sizing:border-box;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	width: 180px
`

const DocLineField = styled.div`
	font-size: 1rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	text-align: center;
`

const DocLineWrapper = styled.div`
	grid-column: content / end;
	grid-row: content / docline;
	padding: 0.5rem 0;
`




const FieldWrapper = styled.div`
	width: 15rem;
	box-sizing: border-box;
`

const FieldTitle = styled.div`
	font-size: 0.8rem;
	font-weight: 600;
	text-transform: uppercase;
`

const FieldTitleGrid = styled(FieldTitle)`
	padding: 1rem 0;
	${({width})=>width? 'width: '+width+'px': ''}
	text-align: center;
`

const TextNoWrap = styled.div`
	font-size: 1rem;
	white-space: nowrap;
	text-overflow: ellipsis;
`

const AddressText = styled.div`
	font-size: 0.8rem;
	white-space: nowrap;
	text-overflow: ellipsis;
` 

const DollarSpan = styled.pre`
	font-family: 'Inconsolata', monospace;
`

const LongTextDiv = styled.div`
	font-size: 0.9rem;
	text-overflow: ellipsis;
`

const ID = styled.span`
	font-size: 1.2rem;
	padding-left : 0.5rem;
	text-transform: uppercase;
`

export const DocEvents = ({title, data}) => {
	return (<p>{title}</p>)
}



export default {
	Container, ButtonsDiv, FieldsDiv,
	RecordID,
	DateOnly, DateTime, Text, Num, Dollar, Address, DocLines, Status
}