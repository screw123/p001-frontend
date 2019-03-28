import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import CheckBox from './CheckBox'
import {TableHeader} from './TableHeaderStyles'

const TableContainer = styled.div`
  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.5);
  border-radius: 16px;
  padding: 5% 10%;
`
const ItemContainer = styled.div`
	display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
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
const ItemContainerFilter = styled(ItemContainer)`
	border: 2px solid #F0F0F0;
  border-radius: 16px;
  padding: 2% 5%;
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

	@media all and (max-width: 767px) {
	    width: calc(100% / 3);
	}

	@media all and (max-width: 430px) {
    width: 100%;
}

`
const FilterPrice= styled.div`

`

class PricingTable extends React.Component {
  state = { checked: false }

  handleCheckboxChange = event => {
    this.setState({ checked: event.target.checked })
  }

	render = () => (
		<React.Fragment>
			<TableContainer>
				<Table>
					<ItemContainerFilter>
						<FilterPrice>
			        <label>
								<input type="radio"/>
		            <span style={{ marginLeft: 8 }}>By day</span>
			        </label>
						</FilterPrice>
						<FilterPrice>
		        	<label>
								<input type="radio"/>
		            <span style={{ marginLeft: 8 }}>By month</span>
			        </label>
						</FilterPrice>
						<FilterPrice>
		        	<label>
								<input type="radio"/>
		            <span style={{ marginLeft: 8 }}>By month</span>
			        </label>
						</FilterPrice>
					</ItemContainerFilter>
					<ItemContainer>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
					</ItemContainer>
					<ItemContainer>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
					</ItemContainer>
					<ItemContainer>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
					</ItemContainer>
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
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
		        </label>
					</TableRow>
					<TableRow>
						<label>
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
		        </label>
					</TableRow>
					<TableRow>
						<label>
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
		        </label>
					</TableRow>
				</Table>
				<Table>
					<TableRow left>
						Lorem ipsum
					</TableRow>
					<TableRow>
						<label>
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
		        </label>
					</TableRow>
					<TableRow>
						<label>
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
		        </label>
					</TableRow>
					<TableRow>
						<label>
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
		        </label>
					</TableRow>
				</Table>
				<Table>
					<TableRow left>
						Lorem ipsum
					</TableRow>
					<TableRow>
						<label>
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
		        </label>
					</TableRow>
					<TableRow>
						<label>
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
		        </label>
					</TableRow>
					<TableRow>
						<label>
		           <CheckBox
		            checked={this.state.checked}
		            onChange={this.handleCheckboxChange}
		            checked
		         	 />
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