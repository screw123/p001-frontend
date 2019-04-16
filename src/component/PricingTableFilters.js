import React, { Component } from 'react';
import { I18n } from 'react-i18next'
import styled from 'styled-components'
import Radio from './Radio'
import ToggleBox from './ToggleBox'

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
const TableRowFilters = styled(TableRow)`
	@media all and (max-width: 740px) {
		border-bottom: 2px solid #F0F0F0;
    	width: calc(100%);
	}
`
const TableRowFiltersBydate = styled(TableRowFilters)`
	display: flex;
    align-items: center;
    justify-content: center;
`
const FilterDate = styled(TableRow)`
	//border: 2px solid #F0F0F0;
	border-radius: 16px;
	padding: 0;
	width: 100%;
`

class PricingTableFilters extends Component {

  constructor(props) {
  	super(props)
	    this.state = {
			days: [
				{id: 1, value: "day", text:"By Day", isChecked: true},
				{id: 2, value: "month", text:"By Month", isChecked: false},
				{id: 3, value: "year", text:"By Year", isChecked: false}
			],

			boxes:[
				{id: 1, value: "box1", name:"Document Box", isChecked: true, picURL: '/images/ico-box.svg'},
				{id: 2, value: "box2", name:"Standard Box", isChecked: true, picURL: '/images/ico-box.svg'},
				{id: 3, value: "box3", name:"Premium Box", isChecked: true, picURL: '/images/ico-box.svg'}
	      	]
	    }
  }

  handleCheckChieldElement = (event) => {
    let boxes = this.state.boxes
    boxes.forEach(box => {
       	if (box.value === event.target.value)
          	box.isChecked =  event.target.checked
		}
	)
    this.setState({boxes: boxes})
  }

  handleCheckChieldElementDays = (event) => {
    let days = this.state.days
    days.forEach(day => {
       if (day.value === event.target.value)
          	day.isChecked =  event.target.checked
        else
      		day.isChecked =  false
    })
    this.setState({days: days})
  }

  	render() {
		return (

			<React.Fragment>
			<Table>

				<TableRowFiltersBydate>
					<FilterDate>
					{/*
						this.state.days.map((day) => {
						return (<Radio handleCheckChieldElementDays={this.handleCheckChieldElementDays} {...day} />)
						})
					*/}
					</FilterDate>
				</TableRowFiltersBydate>
				{
				this.state.boxes.map((box) => {
					return (<TableRowFilters><ToggleBox handleCheckChieldElement={this.handleCheckChieldElement} {...box} /></TableRowFilters>)
				})
				}
			</Table>
		</React.Fragment>
		)
  	}
}

export default PricingTableFilters