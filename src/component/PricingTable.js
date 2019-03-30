import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import CheckBox from './CheckBox'
import Radio from './Radio'
import {TableHeader} from './TableHeaderStyles'

const TableContainer = styled.div`
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

	@media all and (max-width: 550px) {
    width: calc(100% / 2);
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


	render = () => (
		<React.Fragment>
			<TableContainer>
				<Table>
					<TableRow>
						<FilterDate>
		           <Radio
 		            checked={this.state.checked = true}
	             	text = {'By Day'}
		         	 />
 		           <Radio
 		            checked={this.state.checked}
	             	text = {'By Month'}
		         	 />
 		           <Radio
 		            checked={this.state.checked}
	             	text = {'By Year'}
		         	 />
						</FilterDate>
					</TableRow>
					<TableRow>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
					</TableRow>
					<TableRow>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
					</TableRow>
					<TableRow>
						<img src="/images/ico-box.svg" alt=""/>
						<ItemContainerTitle>Document Box</ItemContainerTitle>
						<ItemContainerLink>View details</ItemContainerLink>
					</TableRow>
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