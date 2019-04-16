import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import {StaticCheckBox} from '../component/CheckBox.js'
import PricingTableFilters from '../component/PricingTableFilters'
import {TableHeader} from '../component/TableHeaderStyles'
import { Header } from "../component/HeaderStyles"


const PricingPage = (props) => {
	const g = props.login
	const c = props.i18n

	return (
		<>
			<Header Pricing>{c.t('Pricing')}</Header>
			<TableContainer>
				<PricingTableFilters/>
				<TableHeader>{c.t('Box Features')}</TableHeader>
				<Table>
					<TableRow>{c.t('Size')}</TableRow>
					<TableRow>40cm x 36cm x 30cm</TableRow> <TableRow>60cm x 40cm x 36cm</TableRow><TableRow>60cm x 40cm x 36cm</TableRow>
				</Table>
				<Table>
					<TableRow>{c.t('Insured Value')}</TableRow>
					<TableRow>/</TableRow> <TableRow>HK$1500</TableRow><TableRow>HK$5000</TableRow>
				</Table>
				<Table>
					<TableRow>{c.t('Temp and Humidity Control')}</TableRow>
					<TableRow><StaticCheckBox checked /></TableRow> <TableRow><StaticCheckBox checked /></TableRow><TableRow><StaticCheckBox checked /></TableRow>
				</Table>
				<TableHeader>{c.t('Pricing')}</TableHeader>
				<Table>
					<TableRow>{c.t('By Day')}</TableRow>
					<TableRow>/</TableRow> <TableRow>HK$ 5</TableRow><TableRow>HK$ 10</TableRow>
				</Table>
				<Table>
					<TableRow>{c.t('By Month')}</TableRow>
					<TableRow>HK$ 29</TableRow> <TableRow>HK$ 39</TableRow><TableRow>HK$ 79</TableRow>
				</Table>
				<Table>
					<TableRow>{c.t('By Year')}</TableRow>
					<TableRow>HK$ 290</TableRow> <TableRow>HK$ 390</TableRow><TableRow>HK$ 790</TableRow>
				</Table>
			</TableContainer>						
		</>
	)
}

const TableContainer = styled.div`
	background-color: white;

	box-shadow: 0 6px 12px 0 rgba(0,0,0,0.5);
	border-radius: 16px;
	margin: 5% 10%;
`
const Table = styled.div`
	display: flex;
	flex-flow: row wrap;
	border-bottom: 1px solid #CDCDCD;
`
const TableRow = styled.div`
	border-right: 1px solid #CDCDCD;
	color: #787F84;
	font-size: 18px;
	text-align: ${props => (props.left ? 'left' : 'center')};
	padding: 1.5em 3em;
	width: calc(100% / 4);

		position:relative;

		@media all and (max-width: 1280px) {
		padding: 1.5em 2em;
	}

	@media all and (max-width: 950px) {
			width: calc(100% / 2);
			img {
				display: none;
			}
	}
`

export default PricingPage