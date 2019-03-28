import React from "react"
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import IcoBox from '../img/ico-box.svg'
import CheckBox from './CheckBox'
import Radio from './Radio'

const CardBody = styled.div`
  box-shadow: 0 1rem 1rem rgba(34,34,34,.07);
  padding: 5% 10%;
`
const ItemContainer = styled.div`
	display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 5%;
`
const ItemContainerFilter = styled(ItemContainer)`
	border: 2px solid #F0F0F0;
  border-radius: 16px;
  padding: 2% 5%;
`

const FilterPrice= styled.div`

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
		<CardBody>
			<ItemContainerFilter>
				<FilterPrice>
	        <label>
	         	<Radio
	         		name="dateFilter"
	            checked={this.state.checked}
	            onChange={this.handleCheckboxChange}
	          />
            <span style={{ marginLeft: 8 }}>By day</span>
	        </label>
				</FilterPrice>
				<FilterPrice>
        	<label>
	         	<Radio
	         		name="dateFilter"
	            checked={this.state.checked}
	            onChange={this.handleCheckboxChange}
	          />
            <span style={{ marginLeft: 8 }}>By month</span>
	        </label>
				</FilterPrice>
				<FilterPrice>
        	<label>
	         	<Radio
	         		name="dateFilter"
	            checked={this.state.checked}
	            onChange={this.handleCheckboxChange}
	          />
            <span style={{ marginLeft: 8 }}>By month</span>
	        </label>
				</FilterPrice>
			</ItemContainerFilter>
			<ItemContainer>
				<img src={IcoBox} alt=""/>
				<h3>Document Box</h3>
				<p>View details</p>
			</ItemContainer>
			<ItemContainer>
				<img src={IcoBox} alt=""/>
				<h3>Document Box</h3>
				<p>View details</p>
			</ItemContainer>
			<ItemContainer>
				<img src={IcoBox} alt=""/>
				<h3>Document Box</h3>
				<p>View details</p>
			</ItemContainer>
			<div>
				Pricing
			</div>
			<div>
				<div>
					Lorem ipsum
				</div>
				<div>
					$0
				</div>
				<div>
					$0
				</div>
				<div>
					$0
				</div>
			</div>
			<div>
				Features
			</div>
			<div>
				<div>
					Lorem ipsum
				</div>
				<div>
           <CheckBox
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
            checked
          />
				</div>
				<div>
          <CheckBox
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
            checked
          />
				</div>
				<div>
          <CheckBox
            checked={this.state.checked}
            onChange={this.handleCheckboxChange}
            
          />
				</div>
			</div>
		</CardBody>
	)
}
export default PricingTable