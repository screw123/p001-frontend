import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import {StaticCheckBox} from './CheckBox.js'
import Radio from './Radio'
import PricingTableFilters from './PricingTableFilters'
import {TableHeader} from './TableHeaderStyles'

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

class PricingTable extends React.Component {
  state = { 
  	checked: 'day'
  }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
    this.setState2({ showData: event.target.showData })
  }
	render = () => (
		<React.Fragment>
			<TableContainer>
				<PricingTableFilters/>
				<TableHeader>
					Pricing
				</TableHeader>
				<Table>
					<TableRow left>
						Lorem ipsum
					</TableRow>
					<TableRow>
						$0
					</TableRow>
					<TableRow>
						$0
					</TableRow>
					<TableRow>
						$0
					</TableRow>
				</Table>
				<Table>
					<TableRow left>
						Lorem ipsum
					</TableRow>
					<TableRow>
						$0
					</TableRow>
					<TableRow>
						$0
					</TableRow>
					<TableRow>
						$0
					</TableRow>
				</Table>
				<Table>
					<TableRow left>
						Lorem ipsum
					</TableRow>
					<TableRow>
						$0
					</TableRow>
					<TableRow>
						$0
					</TableRow>
					<TableRow>
						$0
					</TableRow>
				</Table>
				<TableHeader>
					Features
				</TableHeader>
				<Table>
					<TableRow left>
						Lorem ipsum
					</TableRow>
					<TableRow>
						<label>
		           <StaticCheckBox
		            checked
		         	 />
		        </label>
					</TableRow>
					<TableRow>
						<label>
		           <StaticCheckBox
		            checked
		         	 />
		        </label>
					</TableRow>
					<TableRow>
						<label>
		           <StaticCheckBox checked />
		        </label>
					</TableRow>
				</Table>
				<Table>
					<TableRow left>
						Lorem ipsum
					</TableRow>
					<TableRow>
						<label>
						<StaticCheckBox checked />
		        </label>
					</TableRow>
					<TableRow>
						<label>
						<StaticCheckBox checked />
		        </label>
					</TableRow>
					<TableRow>
						<label>
							<StaticCheckBox checked />
		        </label>
					</TableRow>
				</Table>
				<Table>
					<TableRow left>
						Lorem ipsum
					</TableRow>
					<TableRow>
						<label>
							<StaticCheckBox checked />
		        </label>
					</TableRow>
					<TableRow>
						<label>
							<StaticCheckBox checked />
		        </label>
					</TableRow>
					<TableRow>
						<label>
							<StaticCheckBox checked />
		        </label>
					</TableRow>
				</Table>
				<TableHeader>
					Total Amount
				</TableHeader>
			</TableContainer>
    </React.Fragment>
	)
}
export default PricingTable