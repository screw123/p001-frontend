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

const FilterPrice= styled.div`
	padding: 1em;


  background: ${props => (props.checked ? 'linear-gradient(180deg,#f43ea6 0%,#f5576c 100%)' : 'white')};
	
	border-radius: 16px;
	color: ${props => (props.checked ? 'white' : '#A6A6A6')};
`

const Radio = ({name,text,checked, value, ...props }) => (
  <React.Fragment>
		<FilterPrice checked={checked}>
	    <label>
				<HiddenRadio type="radio" {...props} name="filter" value={value}/>
	      <span checked={checked} style={{ marginLeft: 8 }}>{text}</span>
	    </label>
		</FilterPrice>
  </React.Fragment>
)

export default Radio