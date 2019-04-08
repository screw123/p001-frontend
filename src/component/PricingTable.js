import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import {StaticCheckBox} from './CheckBox.js'
import Radio from './Radio'

import Toggle from './Toggle'
import {TableHeader} from './TableHeaderStyles'

const TableContainer = styled.div`
	background-color: white;

  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.5);
  border-radius: 16px;
  margin: 5% 10%;
`
const ItemContainerTitle = styled.h3`
	color: #787F84;
	padding-top: 5%;
	margin-bottom: 1%;
`
const ItemContainerLink = styled.a`
	color: #E61D6E; 	
	font-weight: bold;
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

	@media all and (max-width: 740px) {
    width: calc(100% / 2);
    img {
    	display: none;
    }
	}
`

const TableRowFilters = styled(TableRow)`
	@media all and (max-width: 740px) {
		border-bottom: 2px solid #F0F0F0;
    width: calc(100%);
	}
`


const FilterDate = styled(TableRow)`
	border: 2px solid #F0F0F0;
  border-radius: 16px;
  padding: 0;
  width: 100%;
`

class PricingTable extends React.Component {
  state = { checked: false }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
  }


	handleRadioChange = event => {
    this.setState({ checked: event.target.checked })
  }

	render = () => (
		<React.Fragment>
			<TableContainer>
				<Table>

					<TableRowFilters>
						<FilterDate>
		           <Radio
            		checked={this.state.checked}
		            onChange={this.handleRadioChange}
	             	text = {'By Day'}
		         	 />
 		           <Radio
		            checked={this.state.checked}
		            onChange={this.handleRadioChange}
	             	text = {'By Month'}
		         	 />
 		           <Radio
		            checked={this.state.checked}
		            onChange={this.handleRadioChange}
	             	text = {'By Year'}
		         	 />
						</FilterDate>
					</TableRowFilters>
					<TableRowFilters>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
						<Toggle></Toggle>
					</TableRowFilters>
					<TableRowFilters>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
						<Toggle></Toggle>
					</TableRowFilters>
					<TableRowFilters>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
						<Toggle></Toggle>
					</TableRowFilters>
				</Table>
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