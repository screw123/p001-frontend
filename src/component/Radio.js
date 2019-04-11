import React from "react"
import styled from 'styled-components'

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Text = styled.span`
  font-size: 18px;
  @media all and (max-width: 1280px) {
    font-size: 16px;
  }
`

const FilterPrice= styled.div`
	padding: 1em;
  background: ${props => (props.checked ? 'linear-gradient(180deg,#f43ea6 0%,#f5576c 100%)' : 'white')};
	border-radius: 16px;
	color: ${props => (props.checked ? 'white' : '#A6A6A6')};
`

const Radio = props => (
  <React.Fragment>
		<FilterPrice key={props.id} checked={props.isChecked}>
	    <label checked={props.isChecked} for={props.id}>
				<HiddenRadio  type="radio" id={props.id} onClick={props.handleCheckChieldElementDays} checked={props.isChecked} name="filter" value={props.value}/>
	      <Text style={{ marginLeft: 8 }}>{props.text}</Text>
      </label>
		</FilterPrice>
  </React.Fragment>
)

export default Radio